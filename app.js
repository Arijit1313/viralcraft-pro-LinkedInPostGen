// ViralCraft Pro - LinkedIn Post Generator Logic

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const form = document.getElementById('postForm');
    const resultsSection = document.getElementById('results');
    const copyBtn = document.getElementById('copyBtn');
    const hooksToggle = document.getElementById('hooksToggle');
    const hooksContent = document.getElementById('hooksContent');

    // Data arrays
    const triggers = [
        "Curiosity Gap", "Social Proof", "FOMO", "Authority", 
        "Relatability", "Controversy", "Urgency", "Transformation"
    ];

    const hooks = [
        "💡 I tested {n} different approaches to {topic} in {days} days...",
        "🚀 From struggling with {topic} to mastering it in just {weeks} weeks",
        "🎯 I discovered something shocking about {topic} that 99% of people miss...",
        "🤯 Unpopular opinion: Most people are completely wrong about {topic}",
        "❗ Why do most {audience} fail at {topic}?"
    ];

    const emojiProcess = ["✅", "📊", "📈", "📝", "🔧", "⚙️", "🛠️", "📩", "🔓"];
    const emojiAchieve = ["🎉", "🏆", "🔥", "💪", "⚡", "🚀", "✨", "💯", "🎯"];

    const hashtagPrimary = ["#AI", "#Technology", "#Innovation", "#Automation", "#Productivity"];
    const hashtagSpecific = ["#ChatGPT", "#n8n", "#WorkflowAutomation", "#LinkedInTips"];
    const hashtagEngagement = ["#LinkedInCreators", "#TechCommunity", "#StartupLife"];

    // Utility functions
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function getRandomItems(array, count) {
        const shuffled = [...array].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            topic: document.getElementById('topic').value.trim(),
            audience: document.getElementById('audience').value,
            tone: document.getElementById('tone').value,
            personalStory: document.getElementById('personalStory').value.trim(),
            metrics: document.getElementById('metrics').value.trim(),
            contentType: document.getElementById('contentType').value
        };

        // Validate required fields
        if (!formData.topic) {
            alert('Please enter a topic.');
            document.getElementById('topic').focus();
            return;
        }
        if (!formData.audience) {
            alert('Please select a target audience.');
            document.getElementById('audience').focus();
            return;
        }
        if (!formData.tone) {
            alert('Please select a tone.');
            document.getElementById('tone').focus();
            return;
        }
        if (!formData.contentType) {
            alert('Please select a content type.');
            document.getElementById('contentType').focus();
            return;
        }

        // Generate post
        const postData = generatePost(formData);
        displayResults(postData);
    });

    function generatePost(formData) {
        // Select 3 random psychological triggers
        const selectedTriggers = getRandomItems(triggers, 3);
        
        // Generate hooks
        const generatedHooks = generateHooks(formData);
        const mainHook = generatedHooks[0];
        const alternativeHooks = generatedHooks.slice(1);

        // Build the post
        const post = assemblePost(formData, mainHook);
        
        // Calculate engagement score
        const engagementScore = calculateEngagementScore(post);

        return {
            contentType: formData.contentType,
            triggers: selectedTriggers,
            engagementScore,
            post,
            alternativeHooks
        };
    }

    function generateHooks(formData) {
        const generatedHooks = [];
        const shuffledTemplates = [...hooks].sort(() => Math.random() - 0.5);
        
        for (let i = 0; i < 3; i++) {
            let hook = shuffledTemplates[i] || hooks[i % hooks.length];
            
            // Replace placeholders
            hook = hook.replace('{n}', getRandomInt(3, 7));
            hook = hook.replace('{days}', getRandomInt(14, 60));
            hook = hook.replace('{weeks}', getRandomInt(2, 8));
            hook = hook.replace('{topic}', formData.topic.toLowerCase());
            hook = hook.replace('{audience}', formData.audience.toLowerCase());
            
            generatedHooks.push(hook);
        }
        
        return generatedHooks;
    }

    function assemblePost(formData, mainHook) {
        let post = mainHook + '\n\n';
        
        // Value promise
        post += `Here's how to master ${formData.topic} and transform your approach:\n\n`;
        
        // Generate 5 bullet steps
        const steps = [
            `Define your ${formData.topic} strategy and goals`,
            `Research the best tools and approaches for ${formData.topic}`,
            `Create a systematic workflow for ${formData.topic}`,
            `Test and iterate your ${formData.topic} process`,
            `Scale and optimize your ${formData.topic} results`
        ];
        
        steps.forEach((step, index) => {
            const emoji = getRandomItem(emojiProcess);
            post += `${emoji} ${step}\n`;
        });
        
        post += '\n';
        
        // Add personal story if provided
        if (formData.personalStory) {
            post += `My experience:\n${formData.personalStory}\n\n`;
        }
        
        // Add metrics or default results
        if (formData.metrics) {
            post += `Results: ${formData.metrics}\n\n`;
        } else {
            const achieveEmoji = getRandomItem(emojiAchieve);
            post += `The results speak for themselves ${achieveEmoji}\n\n`;
        }
        
        // Add CTA question
        post += `What's your biggest challenge with ${formData.topic}? Share in the comments! 👇\n\n`;
        
        // Add hashtags
        const hashtags = generateHashtags(formData.topic);
        post += hashtags.join(' ');
        
        return post;
    }

    function generateHashtags(topic) {
        const hashtags = [];
        
        // Add random hashtags from each pool
        hashtags.push(getRandomItem(hashtagPrimary));
        hashtags.push(getRandomItem(hashtagSpecific));
        hashtags.push(getRandomItem(hashtagEngagement));
        
        // Create custom hashtag from topic
        const customHashtag = '#' + topic.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
        hashtags.push(customHashtag);
        
        return hashtags;
    }

    function calculateEngagementScore(post) {
        let score = 50;
        
        // Count emojis
        const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]/gu;
        const emojiCount = (post.match(emojiRegex) || []).length;
        if (emojiCount >= 5 && emojiCount <= 12) score += 10;
        
        // Count hashtags
        const hashtagCount = (post.match(/#\w+/g) || []).length;
        if (hashtagCount >= 3 && hashtagCount <= 5) score += 10;
        
        // Check for CTA question
        if (post.includes('?')) score += 10;
        
        // Check character count
        const charCount = post.length;
        if (charCount >= 1300 && charCount <= 1500) score += 10;
        
        return Math.min(score, 100);
    }

    function displayResults(postData) {
        // Show results section
        resultsSection.classList.remove('hidden');
        
        // Update strategy overview
        document.getElementById('strategyContentType').textContent = postData.contentType;
        document.getElementById('strategyTriggers').textContent = postData.triggers.join(', ');
        document.getElementById('engagementScore').textContent = `${postData.engagementScore}/100`;
        
        // Update post content
        document.getElementById('postContent').textContent = postData.post;
        
        // Update alternative hooks
        const hooksList = document.getElementById('hooksList');
        hooksList.innerHTML = '';
        postData.alternativeHooks.forEach(hook => {
            const hookDiv = document.createElement('div');
            hookDiv.className = 'hook-item';
            hookDiv.textContent = hook;
            hooksList.appendChild(hookDiv);
        });
        
        // Reset hooks toggle to hidden state
        hooksContent.classList.add('hidden');
        hooksToggle.textContent = 'Show Alternative Hooks';
        
        // Scroll to results
        setTimeout(() => {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    // Copy button handler
    copyBtn.addEventListener('click', function() {
        const postContent = document.getElementById('postContent').textContent;
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(postContent).then(() => {
                showCopySuccess();
            }).catch(() => {
                fallbackCopyTextToClipboard(postContent);
            });
        } else {
            fallbackCopyTextToClipboard(postContent);
        }
    });

    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopySuccess();
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        
        document.body.removeChild(textArea);
    }

    function showCopySuccess() {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('btn--success');
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.classList.remove('btn--success');
        }, 2000);
    }

    // Hooks toggle handler
    hooksToggle.addEventListener('click', function() {
        const isHidden = hooksContent.classList.contains('hidden');
        
        if (isHidden) {
            hooksContent.classList.remove('hidden');
            hooksToggle.textContent = 'Hide Alternative Hooks';
        } else {
            hooksContent.classList.add('hidden');
            hooksToggle.textContent = 'Show Alternative Hooks';
        }
    });
});