#!/bin/bash
# ViralCraft Pro - AWS S3 Deployment Script
# Author: Auto-generated
# Date: 2025-07-28

echo "🚀 ViralCraft Pro - AWS S3 Deployment Starting..."
echo "=================================================="

# Configuration
BUCKET_NAME="viralcraft-pro-$(date +%s)"
REGION="us-east-1"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    echo "Visit: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not configured. Please run 'aws configure' first.${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Creating S3 bucket: $BUCKET_NAME${NC}"

# Create S3 bucket
aws s3 mb s3://$BUCKET_NAME --region $REGION

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Bucket created successfully${NC}"
else
    echo -e "${RED}❌ Failed to create bucket${NC}"
    exit 1
fi

# Configure bucket for static website hosting
echo -e "${BLUE}🌐 Configuring static website hosting...${NC}"
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Create bucket policy for public read access
cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF

# Apply bucket policy
echo -e "${BLUE}🔓 Setting bucket policy for public access...${NC}"
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json

# Upload files to S3
echo -e "${BLUE}📤 Uploading application files...${NC}"
aws s3 sync . s3://$BUCKET_NAME --exclude "*.sh" --exclude "*.json" --exclude "*.md" --exclude "deployment-*"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Files uploaded successfully${NC}"
else
    echo -e "${RED}❌ Failed to upload files${NC}"
    exit 1
fi

# Get website URL
WEBSITE_URL="http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"

echo "=================================================="
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${YELLOW}📱 Your ViralCraft Pro app is live at:${NC}"
echo -e "${BLUE}$WEBSITE_URL${NC}"
echo "=================================================="
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo "1. Test your application at the URL above"
echo "2. (Optional) Set up custom domain with CloudFront"
echo "3. (Optional) Configure HTTPS with SSL certificate"
echo ""
echo -e "${YELLOW}💰 Cost Estimate:${NC}"
echo "• S3 Storage: ~$0.01/month for small app"
echo "• Data Transfer: First 1GB free, then $0.09/GB"
echo "• Requests: First 20,000 free, then $0.0004/1000"
echo ""
echo -e "${GREEN}Happy launching! 🚀${NC}"

# Clean up temporary files
rm -f bucket-policy.json
