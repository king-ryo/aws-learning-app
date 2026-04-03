// ========================================
// AWSサービス用語辞書
// ========================================
const awsGlossary = {
  // コンピューティング
  'EC2': {
    name: 'Amazon EC2',
    fullName: 'Elastic Compute Cloud',
    description: 'AWSのクラウド上で仮想サーバー（インスタンス）を起動・管理できるサービス。必要な時に必要な分だけサーバーを利用可能。',
    category: 'コンピューティング',
    color: '#F68C1E'
  },
  'Lambda': {
    name: 'AWS Lambda',
    fullName: 'Lambda',
    description: 'サーバーを管理せずにコードを実行できるサーバーレスコンピューティングサービス。イベント駆動で自動的にスケール。',
    category: 'コンピューティング',
    color: '#F68C1E'
  },
  // ストレージ
  'S3': {
    name: 'Amazon S3',
    fullName: 'Simple Storage Service',
    description: 'インターネット経由でデータを保存・取得できるオブジェクトストレージサービス。99.999999999%の耐久性。',
    category: 'ストレージ',
    color: '#1A8754'
  },
  'EBS': {
    name: 'Amazon EBS',
    fullName: 'Elastic Block Store',
    description: 'EC2インスタンス用の永続的なブロックストレージ。仮想ハードディスクとして機能。',
    category: 'ストレージ',
    color: '#1A8754'
  },
  // データベース
  'RDS': {
    name: 'Amazon RDS',
    fullName: 'Relational Database Service',
    description: 'フルマネージド型のリレーショナルデータベースサービス。MySQL、PostgreSQL、Oracle等に対応。',
    category: 'データベース',
    color: '#2E73B8'
  },
  'DynamoDB': {
    name: 'Amazon DynamoDB',
    fullName: 'DynamoDB',
    description: 'フルマネージド型のNoSQLデータベース。高速で柔軟なスケーリングが可能。',
    category: 'データベース',
    color: '#2E73B8'
  },
  // ネットワーク
  'VPC': {
    name: 'Amazon VPC',
    fullName: 'Virtual Private Cloud',
    description: 'AWS内に論理的に分離された仮想ネットワーク環境を構築するサービス。',
    category: 'ネットワーク',
    color: '#7AA116'
  },
  'CloudFront': {
    name: 'Amazon CloudFront',
    fullName: 'CloudFront',
    description: '世界中のエッジロケーションからコンテンツを高速配信するCDN（コンテンツ配信ネットワーク）サービス。',
    category: 'ネットワーク',
    color: '#7B68EE'
  },
  'Route 53': {
    name: 'Amazon Route 53',
    fullName: 'Route 53',
    description: '高可用性でスケーラブルなDNS（ドメインネームシステム）ウェブサービス。',
    category: 'ネットワーク',
    color: '#7B68EE'
  },
  'ELB': {
    name: 'Elastic Load Balancing',
    fullName: 'Elastic Load Balancing',
    description: '複数のEC2インスタンスにトラフィックを自動的に分散するロードバランサー。',
    category: 'ネットワーク',
    color: '#7AA116'
  },
  'ALB': {
    name: 'Application Load Balancer',
    fullName: 'Application Load Balancer',
    description: 'HTTP/HTTPSトラフィックに特化したロードバランサー。URLパスベースのルーティングが可能。',
    category: 'ネットワーク',
    color: '#7AA116'
  },
  // セキュリティ・ID管理
  'IAM': {
    name: 'AWS IAM',
    fullName: 'Identity and Access Management',
    description: 'AWSリソースへのアクセスを安全に制御するためのサービス。ユーザー、グループ、ロール、ポリシーを管理。',
    category: 'セキュリティ',
    color: '#DD344C'
  },
  'KMS': {
    name: 'AWS KMS',
    fullName: 'Key Management Service',
    description: '暗号化キーの作成と管理を行うマネージドサービス。データの暗号化に使用。',
    category: 'セキュリティ',
    color: '#DD344C'
  },
  'WAF': {
    name: 'AWS WAF',
    fullName: 'Web Application Firewall',
    description: 'Webアプリケーションを一般的な攻撃から保護するファイアウォールサービス。',
    category: 'セキュリティ',
    color: '#DD344C'
  },
  // 管理・ガバナンス
  'CloudFormation': {
    name: 'AWS CloudFormation',
    fullName: 'CloudFormation',
    description: 'テンプレートを使ってAWSリソースをコードとして定義・プロビジョニングするIaCサービス。',
    category: '管理',
    color: '#FF4F8B'
  },
  'CloudWatch': {
    name: 'Amazon CloudWatch',
    fullName: 'CloudWatch',
    description: 'AWSリソースとアプリケーションの監視・ログ管理サービス。メトリクス、アラーム、ダッシュボードを提供。',
    category: '管理',
    color: '#FF4F8B'
  },
  'CloudTrail': {
    name: 'AWS CloudTrail',
    fullName: 'CloudTrail',
    description: 'AWSアカウントのAPIコールを記録・監視するサービス。セキュリティ分析や監査に使用。',
    category: '管理',
    color: '#FF4F8B'
  },
  // その他
  'API Gateway': {
    name: 'Amazon API Gateway',
    fullName: 'API Gateway',
    description: 'REST APIやWebSocket APIを作成・公開・管理するフルマネージドサービス。',
    category: 'アプリケーション統合',
    color: '#9D5CDB'
  },
  'SNS': {
    name: 'Amazon SNS',
    fullName: 'Simple Notification Service',
    description: 'プッシュ通知やメール配信などのメッセージング・通知サービス。',
    category: 'アプリケーション統合',
    color: '#9D5CDB'
  },
  'SQS': {
    name: 'Amazon SQS',
    fullName: 'Simple Queue Service',
    description: 'フルマネージド型のメッセージキューイングサービス。システム間の非同期通信を実現。',
    category: 'アプリケーション統合',
    color: '#9D5CDB'
  },
  // VPC関連
  'サブネット': {
    name: 'サブネット',
    fullName: 'Subnet',
    description: 'VPC内のIPアドレス範囲を分割した区画。パブリックサブネットとプライベートサブネットがある。',
    category: 'ネットワーク',
    color: '#7AA116'
  },
  'インターネットゲートウェイ': {
    name: 'インターネットゲートウェイ',
    fullName: 'Internet Gateway',
    description: 'VPCとインターネット間の通信を可能にするゲートウェイ。パブリックサブネットに必要。',
    category: 'ネットワーク',
    color: '#7AA116'
  },
  'NATゲートウェイ': {
    name: 'NATゲートウェイ',
    fullName: 'NAT Gateway',
    description: 'プライベートサブネットからインターネットへの送信接続を可能にするサービス。',
    category: 'ネットワーク',
    color: '#7AA116'
  },
  'セキュリティグループ': {
    name: 'セキュリティグループ',
    fullName: 'Security Group',
    description: 'インスタンスレベルの仮想ファイアウォール。インバウンド・アウトバウンドのトラフィックを制御。',
    category: 'セキュリティ',
    color: '#DD344C'
  },
  'ルートテーブル': {
    name: 'ルートテーブル',
    fullName: 'Route Table',
    description: 'サブネット内のトラフィックの宛先を決定するルーティング規則の集合。',
    category: 'ネットワーク',
    color: '#7AA116'
  },
  // IAM関連
  'IAMユーザー': {
    name: 'IAMユーザー',
    fullName: 'IAM User',
    description: 'AWSアカウント内で作成する個別のユーザー。認証情報を持ち、権限を割り当てられる。',
    category: 'セキュリティ',
    color: '#DD344C'
  },
  'IAMロール': {
    name: 'IAMロール',
    fullName: 'IAM Role',
    description: '一時的な権限を付与するためのIAMアイデンティティ。AWSサービスやユーザーが引き受け可能。',
    category: 'セキュリティ',
    color: '#DD344C'
  },
  'IAMポリシー': {
    name: 'IAMポリシー',
    fullName: 'IAM Policy',
    description: 'アクセス許可を定義するJSONドキュメント。どのリソースに何ができるかを指定。',
    category: 'セキュリティ',
    color: '#DD344C'
  },
  'MFA': {
    name: 'MFA',
    fullName: 'Multi-Factor Authentication',
    description: '多要素認証。パスワードに加えて追加の認証要素を要求しセキュリティを強化。',
    category: 'セキュリティ',
    color: '#DD344C'
  },
  // リージョン・AZ
  'リージョン': {
    name: 'リージョン',
    fullName: 'Region',
    description: 'AWSのデータセンターが集まる地理的な領域。東京リージョン（ap-northeast-1）など。',
    category: 'インフラ',
    color: '#232F3E'
  },
  'アベイラビリティゾーン': {
    name: 'アベイラビリティゾーン',
    fullName: 'Availability Zone (AZ)',
    description: 'リージョン内の独立したデータセンター群。冗長性と高可用性を実現。',
    category: 'インフラ',
    color: '#232F3E'
  },
  'AZ': {
    name: 'アベイラビリティゾーン',
    fullName: 'Availability Zone',
    description: 'リージョン内の独立したデータセンター群。冗長性と高可用性を実現。',
    category: 'インフラ',
    color: '#232F3E'
  }
};

// ========================================
// アプリケーション状態
// ========================================
const state = {
  currentChapter: 0,
  currentSection: 0,
  progress: {},
  quizAnswers: {}
};

// ========================================
// 利用可能なチャプター
// ========================================
const chapters = [
  { id: 1, title: '01章 AWSの概要', data: chapter01 },
  { id: 2, title: '02章 ユーザー管理サービス（IAM）', data: chapter02 },
  { id: 3, title: '03章 仮想ネットワーク構築（VPC）', data: chapter03 },
  { id: 4, title: '04章 仮想サーバー構築（EC2）', data: chapter04 },
  { id: 5, title: '05章 データベースサービス（RDS）', data: chapter05 },
  { id: 6, title: '06章 オブジェクトストレージ（S3）', data: chapter06 },
  { id: 7, title: '07章 コンテナレジストリ（ECR）', data: chapter07 }
];

// ========================================
// DOM要素参照
// ========================================
const elements = {
  mainContent: document.getElementById('main-content'),
  prevBtn: document.getElementById('prev-btn'),
  nextBtn: document.getElementById('next-btn'),
  currentChapterSpan: document.getElementById('current-chapter'),
  progressFill: document.getElementById('progress-fill'),
  progressText: document.getElementById('progress-text'),
  navList: document.getElementById('nav-list'),
  navFooterInfo: document.getElementById('nav-footer-info'),
  pageNavList: document.getElementById('page-nav-list')
};

// ========================================
// 初期化
// ========================================
function init() {
  loadProgress();
  renderNavigation();
  renderContent();
  updateProgressBar();
  setupEventListeners();
}

// ========================================
// 進捗の読み込み・保存
// ========================================
function loadProgress() {
  try {
    const saved = localStorage.getItem('aws-learning-short-progress');
    if (saved) {
      const data = JSON.parse(saved);
      state.currentChapter = data.currentChapter || 0;
      state.currentSection = data.currentSection || 0;
      state.progress = data.progress || {};
      state.quizAnswers = data.quizAnswers || {};
    }
  } catch (e) {
    console.error('進捗の読み込みに失敗しました', e);
  }
}

function saveProgress() {
  try {
    localStorage.setItem('aws-learning-short-progress', JSON.stringify({
      currentChapter: state.currentChapter,
      currentSection: state.currentSection,
      progress: state.progress,
      quizAnswers: state.quizAnswers
    }));
  } catch (e) {
    console.error('進捗の保存に失敗しました', e);
  }
}

// ========================================
// ナビゲーション描画
// ========================================
function renderNavigation() {
  const navList = elements.navList;
  navList.innerHTML = '';

  chapters.forEach((chapter, chapterIndex) => {
    const chapterData = chapter.data;
    const isCurrentChapter = chapterIndex === state.currentChapter;

    const chapterLi = document.createElement('li');
    chapterLi.className = `nav-chapter${isCurrentChapter ? ' active' : ''}`;

    // 章タイトル
    const chapterHeader = document.createElement('div');
    chapterHeader.className = 'nav-chapter-header';

    chapterHeader.innerHTML = `
      <span class="chapter-number">${chapterIndex + 1}</span>
      <span class="chapter-title">${chapter.data.title}</span>
      <span class="nav-toggle-icon">${isCurrentChapter ? '\u25BC' : '\u25B6'}</span>
    `;

    // 章の子要素コンテナ
    const chapterContent = document.createElement('div');
    chapterContent.className = `nav-chapter-content${isCurrentChapter ? ' expanded' : ''}`;

    // セクションをグループ化（説明、ハンズオン、理解度テスト）
    const groups = groupSections(chapterData.sections);

    // 説明グループ
    if (groups.explanation.length > 0) {
      const explGroup = createNavGroup('説明', 'explanation', groups.explanation, chapterIndex, isCurrentChapter);
      chapterContent.appendChild(explGroup);
    }

    // ハンズオングループ（ドリルダウン）
    if (groups.handson.length > 0) {
      const handsonGroup = createNavGroup('ハンズオン', 'handson', groups.handson, chapterIndex, isCurrentChapter);
      chapterContent.appendChild(handsonGroup);
    }

    // 理解度テストグループ（単一項目）
    if (groups.quiz.length > 0) {
      groups.quiz.forEach(item => {
        const quizItem = createNavItem(item.section, item.index, chapterIndex, 'quiz');
        chapterContent.appendChild(quizItem);
      });
    }

    // 章タイトルのクリックで展開/折りたたみ
    chapterHeader.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleChapter(chapterLi, chapterContent, chapterHeader);
    });

    chapterLi.appendChild(chapterHeader);
    chapterLi.appendChild(chapterContent);
    navList.appendChild(chapterLi);
  });
}

// セクションをタイプ別にグループ化
function groupSections(sections) {
  const groups = {
    explanation: [],
    handson: [],
    quiz: []
  };

  sections.forEach((section, index) => {
    if (section.type === 'quiz') {
      groups.quiz.push({ section, index });
    } else if (section.type === 'handson') {
      groups.handson.push({ section, index });
    } else {
      // 説明パート（type未指定またはexplanation）
      groups.explanation.push({ section, index });
    }
  });

  return groups;
}

// 説明グループのナビ要素を作成
function createNavGroup(label, type, items, chapterIndex, isCurrentChapter) {
  const group = document.createElement('div');
  group.className = 'nav-group';

  // 現在のセクションがこのグループ内にあるかチェック
  const hasActiveSection = items.some(item =>
    chapterIndex === state.currentChapter && item.index === state.currentSection
  );

  const groupHeader = document.createElement('div');
  groupHeader.className = `nav-group-header${hasActiveSection ? ' active' : ''}`;
  groupHeader.innerHTML = `
    <span class="nav-group-icon">${type === 'explanation' ? '\uD83D\uDCD6' : type === 'handson' ? '\uD83D\uDCBB' : '\u2705'}</span>
    <span class="nav-group-label">${label}</span>
    <span class="nav-group-count">${items.length}</span>
    <span class="nav-group-toggle">${(isCurrentChapter && hasActiveSection) ? '\u25BC' : '\u25B6'}</span>
  `;

  const groupContent = document.createElement('div');
  groupContent.className = `nav-group-content${(isCurrentChapter && hasActiveSection) ? ' expanded' : ''}`;

  items.forEach(item => {
    const sectionItem = document.createElement('div');
    sectionItem.className = 'nav-section-item';

    if (chapterIndex === state.currentChapter && item.index === state.currentSection) {
      sectionItem.classList.add('active');
    }

    const progressKey = `${chapterIndex}-${item.index}`;
    if (state.progress[progressKey]) {
      sectionItem.classList.add('completed');
    }

    sectionItem.innerHTML = `
      <span class="nav-section-bullet"></span>
      <span class="nav-section-text">${item.section.title}</span>
    `;

    sectionItem.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateTo(chapterIndex, item.index);
    });

    groupContent.appendChild(sectionItem);
  });

  // グループヘッダーのクリックで展開/折りたたみ
  groupHeader.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = groupContent.classList.contains('expanded');
    groupContent.classList.toggle('expanded', !isExpanded);
    groupHeader.querySelector('.nav-group-toggle').textContent = isExpanded ? '\u25B6' : '\u25BC';
  });

  group.appendChild(groupHeader);
  group.appendChild(groupContent);
  return group;
}

// 単一のナビ項目（ハンズオン、理解度テスト）を作成
function createNavItem(section, sectionIndex, chapterIndex, type) {
  const item = document.createElement('div');
  item.className = `nav-single-item ${type}`;

  if (chapterIndex === state.currentChapter && sectionIndex === state.currentSection) {
    item.classList.add('active');
  }

  const progressKey = `${chapterIndex}-${sectionIndex}`;
  if (state.progress[progressKey]) {
    item.classList.add('completed');
  }

  const icon = type === 'handson' ? '\uD83D\uDCBB' : '\u2705';
  const labelText = type === 'handson' ? 'ハンズオン' : '理解度テスト';

  item.innerHTML = `
    <span class="nav-item-icon">${icon}</span>
    <span class="nav-item-label">${labelText}</span>
  `;

  item.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateTo(chapterIndex, sectionIndex);
  });

  return item;
}

// 章の展開/折りたたみ
function toggleChapter(chapterLi, chapterContent, chapterHeader) {
  const isExpanded = chapterContent.classList.contains('expanded');

  // 他の章を折りたたむ
  document.querySelectorAll('.nav-chapter-content').forEach(content => {
    content.classList.remove('expanded');
  });
  document.querySelectorAll('.nav-chapter-header .nav-toggle-icon').forEach(icon => {
    icon.textContent = '\u25B6';
  });
  document.querySelectorAll('.nav-chapter').forEach(ch => {
    ch.classList.remove('open');
  });

  // クリックした章を展開/折りたたみ
  if (!isExpanded) {
    chapterContent.classList.add('expanded');
    chapterHeader.querySelector('.nav-toggle-icon').textContent = '\u25BC';
    chapterLi.classList.add('open');
  }
}

// ========================================
// ページ内ナビゲーション描画
// ========================================
function renderPageNavigation() {
  const pageNavList = elements.pageNavList;
  pageNavList.innerHTML = '';

  const headings = elements.mainContent.querySelectorAll('h2, h3');
  headings.forEach((heading, index) => {
    const li = document.createElement('li');
    li.className = 'page-nav-item';
    li.textContent = heading.textContent.replace(/^[\uD83D\uDCDA\uD83D\uDD10\uD83D\uDCA1\uD83D\uDEE1\u26A0\u2705\uD83C\uDF89\uD83D\uDD27\uD83D\uDCDD\uD83C\uDF10\uD83D\uDD11\uD83D\uDE80\uD83C\uDFAF\uD83D\uDCCB\u2601\uD83D\uDCBB\uD83D\uDDC4\u2728\uD83D\uDCC8\uD83D\uDEE0\uD83D\uDEA8]/gu, '').trim();

    heading.id = `heading-${index}`;

    li.addEventListener('click', () => {
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    pageNavList.appendChild(li);
  });

  // スクロール位置に応じてハイライト
  updatePageNavHighlight();
}

function updatePageNavHighlight() {
  const headings = elements.mainContent.querySelectorAll('h2, h3');
  const pageNavItems = elements.pageNavList.querySelectorAll('.page-nav-item');

  let activeIndex = 0;
  headings.forEach((heading, index) => {
    const rect = heading.getBoundingClientRect();
    if (rect.top < 200) {
      activeIndex = index;
    }
  });

  pageNavItems.forEach((item, index) => {
    item.classList.toggle('active', index === activeIndex);
  });
}

// ========================================
// コンテンツ描画
// ========================================
function renderContent() {
  const chapter = chapters[state.currentChapter];
  const section = chapter.data.sections[state.currentSection];

  elements.currentChapterSpan.textContent = state.currentChapter + 1;

  let content = '';

  if (section.type === 'quiz') {
    content = renderQuiz(section);
  } else {
    content = section.content;
  }

  elements.mainContent.innerHTML = content;

  // コンテンツ内のスクリプトを実行
  executeInlineScripts(elements.mainContent);

  // クイズのイベントリスナーを設定
  if (section.type === 'quiz') {
    setupQuizListeners(section);
  }

  // ページ内ナビゲーションを更新
  renderPageNavigation();

  // AWSキーワードのクリックイベントを設定
  setupKeywordListeners();

  // スクロールをトップに戻す
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // フッター情報を更新
  const totalSections = chapter.data.sections.length;
  elements.navFooterInfo.textContent = `セクション ${state.currentSection + 1} / ${totalSections}`;

  // ボタンの有効/無効を更新
  updateNavigationButtons();

  // 進捗テキストを更新
  updateProgressText(section.type);

  // コピーライトはTOPページ（第0章・セクション0）のみ表示
  var copyrightEl = document.querySelector('.nav-footer-copyright');
  var contentWrapper = document.querySelector('.content-wrapper');
  var isTop = (state.currentChapter === 0 && state.currentSection === 0);
  if (copyrightEl) {
    copyrightEl.style.display = isTop ? '' : 'none';
  }
  if (contentWrapper) {
    contentWrapper.style.paddingBottom = isTop ? '90px' : '60px';
  }
}

// ========================================
// クイズ描画
// ========================================
function renderQuiz(section) {
  const quizKey = `${state.currentChapter}-quiz`;
  const savedAnswers = state.quizAnswers[quizKey] || {};

  let html = `
    <div class="chapter-container">
      <span class="quiz-badge">理解度テスト</span>
      <h2 class="section-title">${section.title}</h2>
      <p class="text-paragraph">この章で学んだ内容を確認しましょう。</p>
      <div class="quiz-container">
  `;

  section.questions.forEach((q, qIndex) => {
    const answered = savedAnswers[qIndex] !== undefined;
    const userAnswer = savedAnswers[qIndex];
    const isCorrect = userAnswer === q.correct;

    html += `
      <div class="quiz-question" data-question="${qIndex}">
        <div class="question-header">
          <span class="question-number">問題 ${qIndex + 1}</span>
        </div>
        <p class="question-text">${q.question}</p>
        <div class="quiz-options">
    `;

    q.options.forEach((opt, optIndex) => {
      let optionClass = 'quiz-option';
      if (answered) {
        optionClass += ' answered';
        if (optIndex === q.correct) {
          optionClass += ' correct';
        } else if (optIndex === userAnswer && userAnswer !== q.correct) {
          optionClass += ' incorrect';
        }
      }

      html += `
        <div class="${optionClass}" data-option="${optIndex}">
          <span class="option-label">${opt.label}</span>
          <span class="option-text">${opt.text}</span>
        </div>
      `;
    });

    html += `</div>`; // quiz-options

    // 回答済みの場合は解説を表示
    if (answered) {
      html += `
        <div class="quiz-explanation ${isCorrect ? 'correct' : 'incorrect'}">
          <div class="explanation-title">${isCorrect ? '\u2713 正解！' : '\u2717 不正解'}</div>
          <p>${isCorrect ? q.explanation.correct : q.explanation.incorrect}</p>
        </div>
      `;
    }

    html += `</div>`; // quiz-question
  });

  // 全問回答済みの場合は結果を表示
  const allAnswered = section.questions.every((_, i) => savedAnswers[i] !== undefined);
  if (allAnswered) {
    const correctCount = section.questions.filter((q, i) => savedAnswers[i] === q.correct).length;
    const percentage = Math.round((correctCount / section.questions.length) * 100);

    let message = '';
    if (percentage === 100) {
      message = '素晴らしい！完璧です！';
    } else if (percentage >= 80) {
      message = 'よくできました！';
    } else if (percentage >= 60) {
      message = 'もう少しです。復習してみましょう。';
    } else {
      message = 'もう一度、説明を読み直してみましょう。';
    }

    html += `
      <div class="quiz-result">
        <div class="result-score">${correctCount} / ${section.questions.length}</div>
        <div class="result-message">${message}</div>
        <button class="retry-btn" onclick="retryQuiz()">もう一度挑戦する</button>
      </div>
    `;
  }

  html += `
      </div>
    </div>
  `;

  return html;
}

function setupQuizListeners(section) {
  document.querySelectorAll('.quiz-option:not(.answered)').forEach(option => {
    option.addEventListener('click', function() {
      const questionDiv = this.closest('.quiz-question');
      const questionIndex = parseInt(questionDiv.dataset.question);
      const optionIndex = parseInt(this.dataset.option);

      handleQuizAnswer(section, questionIndex, optionIndex);
    });
  });
}

function handleQuizAnswer(section, questionIndex, selectedOption) {
  const quizKey = `${state.currentChapter}-quiz`;
  if (!state.quizAnswers[quizKey]) {
    state.quizAnswers[quizKey] = {};
  }
  state.quizAnswers[quizKey][questionIndex] = selectedOption;
  saveProgress();

  // 該当の問題要素を取得
  const questionDiv = document.querySelector(`.quiz-question[data-question="${questionIndex}"]`);
  if (!questionDiv) return;

  const question = section.questions[questionIndex];
  const isCorrect = selectedOption === question.correct;

  // すべての選択肢にansweredクラスを追加し、正解/不正解を表示
  const options = questionDiv.querySelectorAll('.quiz-option');
  options.forEach((opt, idx) => {
    opt.classList.add('answered');
    if (idx === question.correct) {
      opt.classList.add('correct');
      opt.style.animation = 'correctPulse 0.5s ease';
    } else if (idx === selectedOption && selectedOption !== question.correct) {
      opt.classList.add('incorrect');
      opt.style.animation = 'incorrectShake 0.5s ease';
    }
  });

  // 解説を追加（アニメーション付き）
  const explanationHtml = `
    <div class="quiz-explanation ${isCorrect ? 'correct' : 'incorrect'}" style="animation: slideDown 0.4s ease;">
      <div class="explanation-title">${isCorrect ? '\u2713 正解！' : '\u2717 不正解'}</div>
      <p>${isCorrect ? question.explanation.correct : question.explanation.incorrect}</p>
    </div>
  `;
  questionDiv.insertAdjacentHTML('beforeend', explanationHtml);

  // 全問回答済みかチェックして結果を表示
  const savedAnswers = state.quizAnswers[quizKey];
  const allAnswered = section.questions.every((_, i) => savedAnswers[i] !== undefined);

  if (allAnswered) {
    const correctCount = section.questions.filter((q, i) => savedAnswers[i] === q.correct).length;
    const percentage = Math.round((correctCount / section.questions.length) * 100);

    let message = '';
    if (percentage === 100) {
      message = '素晴らしい！完璧です！';
    } else if (percentage >= 80) {
      message = 'よくできました！';
    } else if (percentage >= 60) {
      message = 'もう少しです。復習してみましょう。';
    } else {
      message = 'もう一度、説明を読み直してみましょう。';
    }

    // 結果表示を追加（少し遅延させてアニメーション）
    setTimeout(() => {
      const quizContainer = document.querySelector('.quiz-container');
      if (quizContainer) {
        const resultHtml = `
          <div class="quiz-result" style="animation: slideUp 0.5s ease;">
            <div class="result-score">${correctCount} / ${section.questions.length}</div>
            <div class="result-message">${message}</div>
            <button class="retry-btn" onclick="retryQuiz()">もう一度挑戦する</button>
          </div>
        `;
        quizContainer.insertAdjacentHTML('beforeend', resultHtml);

        const resultElement = quizContainer.querySelector('.quiz-result');
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 600);
  }
}

function retryQuiz() {
  const quizKey = `${state.currentChapter}-quiz`;
  delete state.quizAnswers[quizKey];
  saveProgress();
  renderContent();
}

// ========================================
// ナビゲーション
// ========================================
function navigateTo(chapterIndex, sectionIndex) {
  // 現在のセクションを完了としてマーク
  const progressKey = `${state.currentChapter}-${state.currentSection}`;
  state.progress[progressKey] = true;

  state.currentChapter = chapterIndex;
  state.currentSection = sectionIndex;
  saveProgress();

  renderNavigation();
  renderContent();
  updateProgressBar();
}

// ロードマップカードからの章ナビゲーション
function navigateToChapter(chapterIndex, sectionIndex = 0) {
  navigateTo(chapterIndex, sectionIndex);
  // コンテンツエリアにスクロール
  const contentArea = document.getElementById('content-area');
  if (contentArea) {
    contentArea.scrollTop = 0;
  }
}

function goToPrevSection() {
  if (state.currentSection > 0) {
    navigateTo(state.currentChapter, state.currentSection - 1);
  } else if (state.currentChapter > 0) {
    const prevChapter = chapters[state.currentChapter - 1];
    const lastSectionIndex = prevChapter.data.sections.length - 1;
    navigateTo(state.currentChapter - 1, lastSectionIndex);
  }
}

function goToNextSection() {
  const currentChapterData = chapters[state.currentChapter].data;

  if (state.currentSection < currentChapterData.sections.length - 1) {
    navigateTo(state.currentChapter, state.currentSection + 1);
  } else if (state.currentChapter < chapters.length - 1) {
    navigateTo(state.currentChapter + 1, 0);
  }
}

function updateNavigationButtons() {
  // 前へボタン
  const isFirst = state.currentChapter === 0 && state.currentSection === 0;
  elements.prevBtn.disabled = isFirst;

  // 次へボタン
  const currentChapterData = chapters[state.currentChapter].data;
  const isLast = state.currentChapter === chapters.length - 1 &&
                 state.currentSection === currentChapterData.sections.length - 1;
  elements.nextBtn.disabled = isLast;
}

// ========================================
// プログレスバー更新
// ========================================
function updateProgressBar() {
  let totalSections = 0;
  let completedSections = 0;

  chapters.forEach((chapter, chapterIndex) => {
    chapter.data.sections.forEach((section, sectionIndex) => {
      totalSections++;
      const progressKey = `${chapterIndex}-${sectionIndex}`;
      if (state.progress[progressKey]) {
        completedSections++;
      }
    });
  });

  // 現在のセクションも進行中としてカウント
  const currentPosition = chapters.slice(0, state.currentChapter).reduce((acc, ch) => acc + ch.data.sections.length, 0) + state.currentSection;
  const percentage = Math.round(((currentPosition + 1) / totalSections) * 100);

  elements.progressFill.style.width = `${percentage}%`;
}

function updateProgressText(sectionType) {
  const typeLabels = {
    explanation: '説明パート',
    handson: 'ハンズオン',
    quiz: '理解度テスト'
  };
  elements.progressText.textContent = typeLabels[sectionType] || '学習中';
}

// ========================================
// イベントリスナー設定
// ========================================
function setupEventListeners() {
  elements.prevBtn.addEventListener('click', goToPrevSection);
  elements.nextBtn.addEventListener('click', goToNextSection);

  // キーボードナビゲーション
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      if (!elements.prevBtn.disabled) {
        goToPrevSection();
      }
    } else if (e.key === 'ArrowRight') {
      if (!elements.nextBtn.disabled) {
        goToNextSection();
      }
    }
  });

  // スクロール時のページ内ナビゲーション更新
  window.addEventListener('scroll', () => {
    updatePageNavHighlight();
  });

  // ナビゲーション固定ボタン
  const pinBtn = document.getElementById('nav-pin-btn');
  const sideNav = document.getElementById('side-nav');
  const contentWrapper = document.querySelector('.content-wrapper');

  if (pinBtn && sideNav && contentWrapper) {
    // 保存された状態を復元
    const isPinned = localStorage.getItem('nav-pinned') === 'true';
    if (isPinned) {
      sideNav.classList.add('pinned');
      contentWrapper.classList.add('nav-pinned');
    }

    pinBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const newPinned = !sideNav.classList.contains('pinned');
      sideNav.classList.toggle('pinned', newPinned);
      contentWrapper.classList.toggle('nav-pinned', newPinned);
      localStorage.setItem('nav-pinned', newPinned);
    });
  }

  // 進捗リセットボタン
  const resetBtn = document.getElementById('progress-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('進捗をリセットしますか？\n（すべての学習履歴が削除されます）')) {
        localStorage.removeItem('aws-learning-short-progress');
        state.currentChapter = 0;
        state.currentSection = 0;
        state.progress = {};
        state.quizAnswers = {};
        renderNavigation();
        renderContent();
        updateProgressBar();
      }
    });
  }

  // ヘッダーブランドクリックで第1章へ遷移
  const headerBrand = document.getElementById('header-brand');
  if (headerBrand) {
    headerBrand.addEventListener('click', () => {
      navigateTo(0, 0);
    });
  }
}

// ========================================
// コードコピー機能
// ========================================
function copyCode(button) {
  const codeBlock = button.closest('.code-block');

  // コードテキストを取得（ボタンを除く）
  const clone = codeBlock.cloneNode(true);
  const copyBtn = clone.querySelector('.copy-btn');
  if (copyBtn) copyBtn.remove();

  let codeText = clone.textContent.trim();

  // data-filename属性がある場合、ファイル名をコードテキストから除去
  const filename = codeBlock.dataset.filename;
  if (filename && codeText.startsWith(filename)) {
    codeText = codeText.substring(filename.length).trim();
  }

  navigator.clipboard.writeText(codeText).then(() => {
    button.textContent = 'コピーしました！';
    button.classList.add('copied');

    setTimeout(() => {
      button.textContent = 'コピー';
      button.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('コピーに失敗しました', err);
    button.textContent = 'コピー失敗';
    setTimeout(() => {
      button.textContent = 'コピー';
    }, 2000);
  });
}

// ========================================
// インラインスクリプト実行
// ========================================
function executeInlineScripts(container) {
  const scripts = container.querySelectorAll('script');
  scripts.forEach(oldScript => {
    const newScript = document.createElement('script');

    // 属性をコピー
    Array.from(oldScript.attributes).forEach(attr => {
      newScript.setAttribute(attr.name, attr.value);
    });

    // スクリプト内容をコピー
    newScript.textContent = oldScript.textContent;

    // 古いスクリプトを新しいスクリプトに置き換え（これにより実行される）
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

// ========================================
// AWSキーワードポップアップ機能
// ========================================
function showKeywordPopup(keyword, element) {
  const info = awsGlossary[keyword];
  if (!info) return;

  // 既存のポップアップを削除
  closeKeywordPopup();

  const popup = document.createElement('div');
  popup.className = 'aws-keyword-popup';
  popup.innerHTML = `
    <div class="keyword-popup-header" style="border-left-color: ${info.color}">
      <span class="keyword-popup-category" style="background: ${info.color}">${info.category}</span>
      <button class="keyword-popup-close" onclick="closeKeywordPopup()">&times;</button>
    </div>
    <div class="keyword-popup-body">
      <h4 class="keyword-popup-name">${info.name}</h4>
      <p class="keyword-popup-fullname">${info.fullName}</p>
      <p class="keyword-popup-description">${info.description}</p>
    </div>
  `;

  document.body.appendChild(popup);

  // 位置を計算
  const rect = element.getBoundingClientRect();
  const popupRect = popup.getBoundingClientRect();

  let top = rect.bottom + 8;
  let left = rect.left;

  // 画面右端からはみ出る場合
  if (left + popupRect.width > window.innerWidth - 20) {
    left = window.innerWidth - popupRect.width - 20;
  }

  // 画面下端からはみ出る場合
  if (top + popupRect.height > window.innerHeight - 20) {
    top = rect.top - popupRect.height - 8;
  }

  popup.style.top = `${top + window.scrollY}px`;
  popup.style.left = `${left}px`;
  popup.classList.add('show');

  // クリック外で閉じる
  setTimeout(() => {
    document.addEventListener('click', handleOutsideClick);
  }, 10);
}

function closeKeywordPopup() {
  const popup = document.querySelector('.aws-keyword-popup');
  if (popup) {
    popup.remove();
  }
  document.removeEventListener('click', handleOutsideClick);
}

function handleOutsideClick(e) {
  if (!e.target.closest('.aws-keyword-popup') && !e.target.closest('.aws-keyword')) {
    closeKeywordPopup();
  }
}

// キーワードのクリックイベントを設定
function setupKeywordListeners() {
  document.querySelectorAll('.aws-keyword').forEach(el => {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const keyword = this.dataset.service || this.textContent;
      showKeywordPopup(keyword, this);
    });
  });
}

// ========================================
// 使い方ガイドモーダル
// ========================================
function openUserGuide() {
  const overlay = document.getElementById('user-guide-overlay');
  if (!overlay) return;

  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeUserGuide() {
  const overlay = document.getElementById('user-guide-overlay');
  if (!overlay) return;

  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

function initUserGuide() {
  const overlay = document.getElementById('user-guide-overlay');
  const closeBtn = document.getElementById('user-guide-close-btn');

  if (!overlay || !closeBtn) return;

  // 閉じるボタン
  closeBtn.addEventListener('click', closeUserGuide);

  // オーバーレイクリックで閉じる
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeUserGuide();
    }
  });

  // Escキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (overlay.classList.contains('show') && e.key === 'Escape') {
      closeUserGuide();
    }
  });
}

// ========================================
// インラインスライドショー
// ========================================
const inlineSlideshows = {};

function initInlineSlideshow(name, config) {
  inlineSlideshows[name] = {
    current: 0,
    config: config
  };

  // インジケーターを生成
  const indicatorsEl = document.getElementById(config.indicatorsId);
  if (indicatorsEl) {
    indicatorsEl.innerHTML = '';
    for (let i = 0; i < config.pageCount; i++) {
      const dot = document.createElement('span');
      dot.className = 'inline-slide-indicator' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        inlineSlideshows[name].current = i;
        renderInlineSlide(name);
      });
      indicatorsEl.appendChild(dot);
    }
  }

  // 矢印ボタンのイベント
  document.querySelectorAll(`[data-slideshow="${name}"]`).forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.dir === 'prev') {
        prevInlineSlide(name);
      } else {
        nextInlineSlide(name);
      }
    });
  });

  renderInlineSlide(name);
}

function renderInlineSlide(name) {
  const ss = inlineSlideshows[name];
  if (!ss) return;

  const { current, config } = ss;
  const imgEl = document.getElementById(config.imgId);
  const counterEl = document.getElementById(config.counterId);

  // 画像パス: folder/prefix + 2桁0埋め番号 + .png
  const num = String(current + 1).padStart(2, '0');
  imgEl.src = `${config.folder}/${config.prefix}${num}.png`;
  imgEl.alt = `${config.prefix} ${current + 1} / ${config.pageCount}`;

  counterEl.textContent = `${current + 1} / ${config.pageCount}`;

  // 矢印ボタンの有効/無効
  const arrows = document.querySelectorAll(`[data-slideshow="${name}"]`);
  arrows.forEach(btn => {
    if (btn.dataset.dir === 'prev') {
      btn.disabled = (current <= 0);
    } else {
      btn.disabled = (current >= config.pageCount - 1);
    }
  });

  // インジケーター更新
  const indicators = document.getElementById(config.indicatorsId);
  if (indicators) {
    indicators.querySelectorAll('.inline-slide-indicator').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }
}

function nextInlineSlide(name) {
  const ss = inlineSlideshows[name];
  if (!ss) return;
  if (ss.current < ss.config.pageCount - 1) {
    ss.current++;
    renderInlineSlide(name);
  }
}

function prevInlineSlide(name) {
  const ss = inlineSlideshows[name];
  if (!ss) return;
  if (ss.current > 0) {
    ss.current--;
    renderInlineSlide(name);
  }
}

// ========================================
// 初期化実行
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  init();
  initUserGuide();
});
