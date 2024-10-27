// 导航功能
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');

    // 根据当前 URL 显示正确的部分
    function showCorrectSection() {
        const hash = window.location.hash || '#home';
        sections.forEach(section => section.classList.remove('active'));
        document.querySelector(hash).classList.add('active');
    }

    // 页面加载时显示正确的部分
    showCorrectSection();

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            window.location.hash = targetId;
            showCorrectSection();
        });
    });

    // 监听 hashchange 事件，以便在使用浏览器的后退/前进按钮时更新显示
    window.addEventListener('hashchange', showCorrectSection);

    // 添加"了解详情"按钮的点击事件
    const learnMoreBtn = document.getElementById('learn-more');
    const projectIntro = document.querySelector('.project-intro');

    learnMoreBtn.addEventListener('click', function() {
        projectIntro.scrollIntoView({ behavior: 'smooth' });
    });
});

// 开始练习功能
function startPractice() {
    alert('开始手语练习！');
    // 这里可以添加更复杂的练习逻辑
}

// 实时翻译功能
let stream;

async function startTranslation() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById('camera-feed').srcObject = stream;
        document.getElementById('translation-text').textContent = '正在翻译...';
        // 这里应该添加实际的翻译逻辑
    } catch (err) {
        console.error('无法访问摄像头:', err);
        alert('无法访问摄像头，请确保您已授予权限。');
    }
}

// 个人资料表单提交
document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const profileData = Object.fromEntries(formData.entries());
    console.log('个人资料已更新:', profileData);
    // 这里应该添加将数据发送到服务器的逻辑
    alert('个人资料已更新！');
});

// 在文件末尾添加以下代码
document.addEventListener('DOMContentLoaded', function() {
    const videoList = document.querySelector('.video-list');
    const videoItems = document.querySelectorAll('.video-item');
    const prevButton = document.getElementById('prev-video');
    const nextButton = document.getElementById('next-video');
    let currentIndex = 0;

    function showVideo(index, direction) {
        videoItems.forEach((item, i) => {
            if (i === index) {
                item.style.transform = 'translateX(0)';
            } else if (i === (index - 1 + videoItems.length) % videoItems.length) {
                item.style.transform = 'translateX(-100%)';
            } else if (i === (index + 1) % videoItems.length) {
                item.style.transform = 'translateX(100%)';
            } else {
                item.style.transform = 'translateX(' + (direction === 'next' ? '100%' : '-100%') + ')';
            }
        });
    }

    function nextVideo() {
        currentIndex = (currentIndex + 1) % videoItems.length;
        showVideo(currentIndex, 'next');
    }

    function prevVideo() {
        currentIndex = (currentIndex - 1 + videoItems.length) % videoItems.length;
        showVideo(currentIndex, 'prev');
    }

    nextButton.addEventListener('click', nextVideo);
    prevButton.addEventListener('click', prevVideo);

    // 初始显示第一个视频
    showVideo(0, 'next');

    // 添加触摸���持
    let touchStartX = 0;
    let touchEndX = 0;

    videoList.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    videoList.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX) {
            nextVideo();
        }
        if (touchEndX > touchStartX) {
            prevVideo();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.querySelector('.video-container');
    const loadingIndicator = document.getElementById('loading');
    let isLoading = false;

    window.addEventListener('scroll', function() {
        if (isLoading) return;

        const rect = videoContainer.getBoundingClientRect();
        const bottomOfWindow = window.innerHeight;

        if (rect.bottom <= bottomOfWindow + 100) { // 当容器底部接近视窗底部时
            loadMoreVideos();
        }
    });

    function loadMoreVideos() {
        isLoading = true;
        loadingIndicator.style.display = 'block';

        // 模拟加载更多视频的过程
        setTimeout(function() {
            // 这里应该是您加载更多视频的实逻辑
            // 现在我们只是隐藏加载指示器
            loadingIndicator.style.display = 'none';
            isLoading = false;
        }, 2000); // 2秒后隐藏加载指示器
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const videoGrid = document.getElementById('video-grid');
    const loadingIndicator = document.getElementById('loading');
    let isLoading = false;
    let currentIndex = 0;

    const allVideos = [
        {
            thumbnail: "imgs/跟我一起，100天解锁手语世界--约新朋友出门篇.png",
            title: "跟我一起，100天解锁手语世界——约新朋友出门篇",
            description: "跟我一起系列，带你100天学会手语",
            url: "https://www.bilibili.com/video/BV164yUYREEC/"
        },
        {
            thumbnail: "imgs/一些很实用的手语教程.png",
            title: "一些很实用的手语教程",
            description: "学习日常生活中常用的实用手语表达",
            url: "https://www.bilibili.com/video/BV1LC411V7zc/"
        },
        {
            thumbnail: "imgs/中国手语教程零基础学起 国标规范 以声之形，传心之音.png",
            title: "中国手语教程零基础学起 国标规范 以声之形，传心之音",
            description: "每集十分钟左右，吃饭的时候学一学，让爱没有障碍。",
            url: "https://www.bilibili.com/video/BV1nx411i7gV/"
        },
        {
            thumbnail: "imgs/教你一招制服装爱心捐献装聋哑的骗子！.png",
            title: "教你一招制服装爱心捐献装聋哑的骗子！",
            description: "学习如何识别和应对冒充聋哑人的骗子",
            url: "https://www.bilibili.com/video/BV1px4y1m7La/"
        },
        {
            thumbnail: "imgs/【教程】手语基础教程.png",
            title: "【教程】手语基础教程",
            description: "系统学习手语基础知识和技巧",
            url: "https://www.bilibili.com/video/BV1LW411s7gR/"
        }
    ];

    function createVideoElement(video) {
        console.log('Creating video element for:', video.title);
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}" class="video-cover">
                <div class="video-overlay">
                    <a href="${video.url}" target="_blank" class="watch-btn">观看视频</a>
                </div>
            </div>
            <div class="video-info">
                <h3><a href="${video.url}" target="_blank">${video.title}</a></h3>
                <p>${video.description}</p>
            </div>
        `;
        return videoItem;
    }

    function loadVideos() {
        console.log('loadVideos function called');
        videoGrid.innerHTML = '';
        for (let i = 0; i < 2; i++) {
            const index = (currentIndex + i) % allVideos.length;
            videoGrid.appendChild(createVideoElement(allVideos[index]));
        }
        currentIndex = (currentIndex + 2) % allVideos.length;
    }

    function loadMoreVideos() {
        isLoading = true;
        loadingIndicator.style.display = 'block';

        setTimeout(function() {
            loadVideos();
            loadingIndicator.style.display = 'none';
            isLoading = false;
        }, 1000);
    }

    window.addEventListener('scroll', function() {
        if (isLoading) return;

        const rect = videoGrid.getBoundingClientRect();
        const bottomOfWindow = window.innerHeight;

        if (rect.bottom <= bottomOfWindow + 100) {
            loadMoreVideos();
        }
    });

    // 初始加载视频
    console.log('About to call initial loadVideos');
    loadVideos();
    console.log('Initial loadVideos called');
});

// 在文件末尾添加以下代码

document.addEventListener('DOMContentLoaded', function() {
    const startTranslationBtn = document.getElementById('start-translation');
    const cameraFeed = document.getElementById('camera-feed');
    const translationText = document.getElementById('translation-text');
    let stream;

    startTranslationBtn.addEventListener('click', async function() {
        if (stream) {
            stopTranslation();
        } else {
            await startTranslation();
        }
    });

    async function startTranslation() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            cameraFeed.srcObject = stream;
            cameraFeed.style.display = 'block'; // 显示视频元素
            document.querySelector('.placeholder-image').style.display = 'none'; // 隐藏占位图片
            startTranslationBtn.textContent = '停止翻译';
            translationText.textContent = '正在翻译...';
            // 这里添加实际的翻译逻辑
            // 例如，可以每隔一段时间捕获视频帧并发送到后端进行处理
            // 然后更新 translationText 的内容
        } catch (err) {
            console.error('无法访问摄像头:', err);
            alert('无法访问摄像头，请确保您已授予权限。');
        }
    }

    function stopTranslation() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
            cameraFeed.srcObject = null;
            cameraFeed.style.display = 'none'; // 隐藏视频元素
            document.querySelector('.placeholder-image').style.display = 'block'; // 显示占位图片
            startTranslationBtn.textContent = '开始翻译';
            translationText.textContent = '翻译已停止';
        }
    }
});

// 在文件末尾添加以下代码

document.addEventListener('DOMContentLoaded', function() {
    const editProfileBtn = document.getElementById('edit-profile');
    const viewProgressBtn = document.getElementById('view-progress');

    editProfileBtn.addEventListener('click', function() {
        // 这里可以添加编辑个人资料的逻辑
        alert('编辑个人资料功能正在开发中');
    });

    viewProgressBtn.addEventListener('click', function() {
        // 这里可以添加查看学习进度的逻辑
        alert('查看学习进度功能正在开发中');
    });
});
