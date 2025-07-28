# ViralCraft Pro Deployment Instructions

This file explains how to deploy ViralCraft Pro to either AWS S3 (free tier) or GitHub Pages (100% free). It accompanies the **deploy-aws.sh** script provided in the same folder.

---

## Prerequisites

1. **Download code** – ensure you have `index.html`, `style.css`, and `app.js` in one directory.
2. **AWS CLI** – install & configure (`aws configure`) for the AWS option.
3. **Git** – install for the GitHub Pages option.

---

## OPTION A — Deploy to AWS S3 (Static Website Hosting)

1. Open a terminal and `cd` into the project folder containing `deploy-aws.sh`.
2. Make the script executable:

```bash
chmod +x deploy-aws.sh
```

3. Run the script:

```bash
./deploy-aws.sh
```

4. The script will:
   - Create a **unique S3 bucket**
   - Enable **static website hosting**
   - Attach a **public-read policy**
   - **Sync** all HTML/CSS/JS files to the bucket
   - Output a **live website URL** (copy/paste into a browser)

5. (Optional) Add **CloudFront + HTTPS** and map your **custom domain**.

---

## OPTION B — Deploy to GitHub Pages (Free Public Domain)

1. Create a **new GitHub repository** (public) called `viralcraft-pro`.
2. Initialize Git and push files:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/viralcraft-pro.git
git push -u origin main
```

3. In the GitHub repo, go to **Settings → Pages**.
4. **Source**: Select **Branch: `main`** and **root** (\/) folder.
5. Click **Save**. GitHub Pages spins up the site at:

```
https://<YOUR-USERNAME>.github.io/viralcraft-pro/
```

6. (Optional) Add a **custom domain** and enable **Enforce HTTPS**.

---

## Files Provided

- `deploy-aws.sh` – one-click deployment script for AWS S3
- `index.html` – main UI
- `style.css` – styling
- `app.js` – app logic

Copy these four files into the same folder before deploying.

---

## Quick Test

Once deployed, open the URL. You should see the ViralCraft Pro form. Enter a topic (e.g., **AI Marketing**), select options, and click **Generate Post**.

If the generated post and engagement score appear, the deployment is successful.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| 403 Forbidden on AWS | Bucket policy missing or objects aren’t public | Re-run `deploy-aws.sh` or add public-read ACL manually |
| CSS/JS not loading | Incorrect paths | Ensure `index.html` links to `style.css` and `app.js` in same folder |
| GitHub Pages 404 | Wrong branch/folder | Confirm Pages source is `main` branch and root dir |
|

---

🚀 **Enjoy your new ViralCraft Pro deployment!**