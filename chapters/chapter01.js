// ========================================
// 第1章: AWSの概要（短縮版）
// ========================================
const chapter01 = {
  id: 1,
  title: "AWSの概要",
  sections: [
    // セクション1: この章で学ぶこと
    {
      id: "1-intro",
      title: "この章で学ぶこと",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <div class="chapter-intro-banner">
            <div class="chapter-number">CHAPTER 01</div>
            <h1 class="chapter-main-title">AWSの概要</h1>
            <p class="chapter-subtitle">クラウドコンピューティングの世界へようこそ</p>
          </div>

          <div class="learning-goals">
            <h3 class="learning-goals-title">&#127919; この章の学習目標</h3>
            <ul class="learning-goals-list">
              <li>AWSとは何かを理解する</li>
              <li>クラウドを利用するメリットを説明できる</li>
              <li>AWSの主要サービスの種類を把握する</li>
              <li>リージョンとアベイラビリティゾーンの概念を理解する</li>
              <li>AWSアカウントの作成方法を知る</li>
            </ul>
          </div>

          <h2 class="section-title">&#128218; はじめに</h2>

          <p class="text-paragraph">
            この章では、<span class="highlight">AWS（Amazon Web Services）</span>の基本的な概念を学びます。
            クラウドコンピューティングが何であるか、なぜ多くの企業がAWSを選ぶのかを理解しましょう。
          </p>

          <div class="info-box">
            <div class="info-box-title">&#128161; 初学者の方へ</div>
            <p>
              この教材は、<strong>ITの専門知識がない方</strong>でも理解できるように作られています。
              分からない用語が出てきたら、その都度解説しますので、安心して読み進めてください。
            </p>
          </div>

          <div class="warning-box">
            <div class="warning-box-title">&#9888; AWSサービスの最新情報について</div>
            <p>
              AWSは<strong>頻繁にサービスの追加・更新・料金変更</strong>を行っています。
              本教材の内容は作成時点の情報に基づいているため、
              実際の画面や仕様が変更されている場合があります。
            </p>
            <p style="margin-top: 8px;">
              最新の正確な情報については、必ず
              <a href="https://docs.aws.amazon.com/" target="_blank" rel="noopener"><strong>AWS公式ドキュメント</strong></a>
              をご確認ください。各章の末尾にも公式ドキュメントへのリンクを掲載しています。
            </p>
          </div>

          <h2 class="section-title">&#128506; コースの全体像</h2>
          <p class="text-paragraph">
            この教材では、AWSの基礎から実践的な構築まで、<span class="highlight">全6章</span>で体系的に学習できます。
            各章は前の章の知識を活かして進められるよう構成されています。
          </p>

          <div class="course-roadmap">
            <div class="roadmap-category">
              <div class="category-title">&#128218; 基礎編</div>
              <div class="roadmap-grid">
                <div class="roadmap-card chapter-available" onclick="navigateToChapter(0)">
                  <div class="roadmap-card-number">01</div>
                  <div class="roadmap-card-content">
                    <h4 class="roadmap-card-title">AWSの概要</h4>
                    <p class="roadmap-card-desc">AWSクラウドの基礎知識を学ぶ</p>
                  </div>
                </div>
                <div class="roadmap-card chapter-available" onclick="navigateToChapter(1)">
                  <div class="roadmap-card-number">02</div>
                  <div class="roadmap-card-content">
                    <h4 class="roadmap-card-title">ユーザー管理サービス（IAM）</h4>
                    <p class="roadmap-card-desc">セキュリティの基本を学ぶ</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="roadmap-category">
              <div class="category-title">&#128295; ネットワーク・コンピューティング編</div>
              <div class="roadmap-grid">
                <div class="roadmap-card chapter-available" onclick="navigateToChapter(2)">
                  <div class="roadmap-card-number">03</div>
                  <div class="roadmap-card-content">
                    <h4 class="roadmap-card-title">仮想ネットワーク構築（VPC）</h4>
                    <p class="roadmap-card-desc">ネットワークの基礎を学ぶ</p>
                  </div>
                </div>
                <div class="roadmap-card chapter-available" onclick="navigateToChapter(3)">
                  <div class="roadmap-card-number">04</div>
                  <div class="roadmap-card-content">
                    <h4 class="roadmap-card-title">仮想サーバー構築（EC2）</h4>
                    <p class="roadmap-card-desc">サーバー構築の基礎を学ぶ</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="roadmap-category">
              <div class="category-title">&#128451; データ・ストレージ編</div>
              <div class="roadmap-grid">
                <div class="roadmap-card chapter-available" onclick="navigateToChapter(4)">
                  <div class="roadmap-card-number">05</div>
                  <div class="roadmap-card-content">
                    <h4 class="roadmap-card-title">データベースサービス（RDS）</h4>
                    <p class="roadmap-card-desc">データベースの基礎を学ぶ</p>
                  </div>
                </div>
                <div class="roadmap-card chapter-available" onclick="navigateToChapter(5)">
                  <div class="roadmap-card-number">06</div>
                  <div class="roadmap-card-content">
                    <h4 class="roadmap-card-title">オブジェクトストレージ（S3）</h4>
                    <p class="roadmap-card-desc">ストレージの基礎を学ぶ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3 class="section-subtitle">この章の構成</h3>
          <ul class="feature-list">
            <li><strong>1.1 AWSとは</strong> - AWSの基本的な概念を学びます</li>
            <li><strong>1.2 AWSの利点</strong> - クラウドを使うメリットを理解します</li>
            <li><strong>1.3 サービスの種類</strong> - AWSが提供する様々なサービスを概観します</li>
            <li><strong>1.4 リージョンとAZ</strong> - AWSのグローバルインフラを理解します</li>
            <li><strong>1.5 アカウントの作成</strong> - 実際にAWSを使い始める準備をします</li>
          </ul>
        </div>
      `
    },
    // セクション2: AWSとは
    {
      id: "1-1",
      title: "AWSとは",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#9729; 1.1 AWSとは</h2>

          <p class="text-paragraph">
            <span class="highlight">AWS（Amazon Web Services）</span>は、Amazonが提供する
            <strong>クラウドコンピューティングサービス</strong>です。
            2006年にサービスを開始し、現在では世界最大のクラウドプロバイダーとなっています。
          </p>

          <div class="term-box">
            <div class="term-box-title">&#128218; クラウドコンピューティングとは？</div>
            <p>
              インターネットを通じて、サーバー、ストレージ、データベースなどのITリソースを
              <strong>必要なときに、必要な分だけ</strong>利用できるサービスのことです。
              従来は自社でサーバーを購入する必要がありましたが、
              クラウドなら<strong>すぐに、低コストで</strong>ITインフラを利用できます。
            </p>
          </div>

          <div class="term-box">
            <div class="term-box-title">&#128218; オンプレミスとは？</div>
            <p>
              「オンプレミス（on-premises）」とは、<strong>自社の建物内にサーバーやネットワーク機器を設置して運用する方式</strong>のことです。
              英語の「premises（施設・構内）」が語源で、「自社構内で」という意味があります。
            </p>
            <p style="margin-top: 8px;">
              たとえば、会社の中にサーバールームを作り、そこにコンピューターを置いて管理するイメージです。
              機器の購入から設置、故障時の修理まで、<strong>すべて自分たちで行う必要</strong>があります。
            </p>
            <p style="margin-top: 8px;">
              クラウドが登場する前は、ほとんどの企業がこのオンプレミス方式でITシステムを運用していました。
            </p>
          </div>

          <h3 class="section-subtitle">従来の方式（オンプレミス）との比較</h3>

          <div class="comparison-container">
            <div class="bad-example">
              <div class="example-header">
                <span class="example-badge">従来方式</span>
                <span class="example-title">オンプレミス</span>
              </div>
              <ul class="feature-list">
                <li>サーバーを自社で購入・管理</li>
                <li>初期投資が大きい（数百万円〜）</li>
                <li>セットアップに数週間〜数ヶ月</li>
                <li>スケールアップが困難</li>
              </ul>
            </div>
            <div class="good-example">
              <div class="example-header">
                <span class="example-badge">クラウド</span>
                <span class="example-title">AWS</span>
              </div>
              <ul class="feature-list">
                <li>サーバーはAWSが管理</li>
                <li>初期費用ゼロ、使った分だけ課金</li>
                <li>数分でサーバーを起動可能</li>
                <li>ワンクリックでスケール可能</li>
              </ul>
            </div>
          </div>

          <div class="point-box">
            <div class="point-box-title">&#128200; AWSの実績</div>
            <ul class="feature-list">
              <li><strong>200以上</strong>のクラウドサービスを提供</li>
              <li>世界<strong>30以上</strong>のリージョン（地域）で運営</li>
              <li>Netflix、NASA、トヨタなど大企業が利用</li>
              <li>クラウド市場シェア<strong>世界1位</strong></li>
            </ul>
          </div>
        </div>
      `
    },
    // セクション3: AWSの利点
    {
      id: "1-2",
      title: "AWSの利点",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128171; 1.2 AWSの利点</h2>

          <p class="text-paragraph">
            なぜ多くの企業がAWSを選ぶのでしょうか？
            ここでは、AWSを利用する<span class="highlight">6つの主要なメリット</span>を説明します。
          </p>

          <h3 class="section-subtitle">1. 初期費用がゼロ</h3>
          <div class="card">
            <h4 class="card-title"><span class="icon">&#128176;</span>従量課金制</h4>
            <p class="text-paragraph">
              AWSは<strong>「使った分だけ支払う」</strong>従量課金制です。
              高価なサーバーを購入する必要がなく、初期投資ゼロで始められます。
            </p>
          </div>

          <h3 class="section-subtitle">2. すぐに始められる</h3>
          <div class="card">
            <h4 class="card-title"><span class="icon">&#9889;</span>迅速なデプロイ</h4>
            <p class="text-paragraph">
              従来、サーバーの調達には数週間〜数ヶ月かかりましたが、
              AWSなら<strong>数分でサーバーを起動</strong>できます。
            </p>
          </div>

          <h3 class="section-subtitle">3. 柔軟なスケーリング</h3>
          <div class="card">
            <h4 class="card-title"><span class="icon">&#128200;</span>伸縮自在</h4>
            <p class="text-paragraph">
              アクセスが増えたらサーバーを増やし、落ち着いたら減らす。
              AWSなら<strong>必要に応じてリソースを自動調整</strong>できます。
            </p>
            <div class="term-box">
              <div class="term-box-title">&#128218; スケーリングとは？</div>
              <p>
                <strong>スケールアップ</strong>：サーバーの性能を上げること（CPUやメモリを増やす）<br>
                <strong>スケールアウト</strong>：サーバーの台数を増やすこと
              </p>
            </div>
          </div>

          <h3 class="section-subtitle">4. グローバル展開が容易</h3>
          <div class="card">
            <h4 class="card-title"><span class="icon">&#127760;</span>世界中にデータセンター</h4>
            <p class="text-paragraph">
              AWSは世界30以上の地域にデータセンターを持ち、
              <strong>ボタンひとつで世界中にサービスを展開</strong>できます。
            </p>
          </div>

          <h3 class="section-subtitle">5. 高い信頼性</h3>
          <div class="card">
            <h4 class="card-title"><span class="icon">&#128737;</span>99.99%の可用性</h4>
            <p class="text-paragraph">
              複数のデータセンターにデータを分散させ、<strong>障害に強い設計</strong>になっています。
              マルチAZ構成により<strong>99.99%の高い可用性</strong>を実現できます。
            </p>
          </div>

          <h3 class="section-subtitle">6. セキュリティ</h3>
          <div class="card">
            <h4 class="card-title"><span class="icon">&#128274;</span>世界最高水準のセキュリティ</h4>
            <p class="text-paragraph">
              銀行や政府機関も利用する<strong>高度なセキュリティ基準</strong>を満たしています。
            </p>
          </div>

          <!-- AWSの6つの利点 スライドショー -->
          <div class="inline-slideshow" id="six-advantages-slideshow">
            <div class="inline-slideshow-header">
              <h3 class="inline-slideshow-title">&#128196; AWSの6つの利点 図解</h3>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="six-advantages" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img class="inline-slide-image" id="six-advantages-slide-img" src="images/01/Six-Advantages01.png" alt="AWSの6つの利点 1 / 8">
                </div>
                <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="six-advantages" data-dir="next" aria-label="次のスライド">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span class="inline-slide-counter" id="six-advantages-counter">1 / 8</span>
              </div>
              <div class="inline-slide-indicators" id="six-advantages-indicators"></div>
            </div>
          </div>

          <script>
            initInlineSlideshow('six-advantages', {
              folder: 'images/01',
              prefix: 'Six-Advantages',
              pageCount: 8,
              imgId: 'six-advantages-slide-img',
              counterId: 'six-advantages-counter',
              indicatorsId: 'six-advantages-indicators'
            });
          </script>

          <div class="summary-box">
            <h3 class="summary-title">&#128203; まとめ：AWSの6つの利点</h3>
            <ul class="summary-list">
              <li>初期費用ゼロ、従量課金制</li>
              <li>数分でインフラを構築可能</li>
              <li>需要に応じた柔軟なスケーリング</li>
              <li>世界中へのグローバル展開が容易</li>
              <li>99.99%の高い可用性</li>
              <li>世界最高水準のセキュリティ</li>
            </ul>
          </div>
        </div>
      `
    },
    // セクション4: サービスの種類
    {
      id: "1-3",
      title: "サービスの種類",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128230; 1.3 サービスの種類</h2>

          <p class="text-paragraph">
            AWSは<span class="highlight">200以上のサービス</span>を提供しています。
            すべてを覚える必要はありませんが、主要なカテゴリと代表的なサービスを押さえておきましょう。
          </p>

          <h3 class="section-subtitle">コンピューティング</h3>
          <div class="card">
            <div class="aws-service-box ec2">&#128187; <span class="aws-keyword" data-service="EC2">EC2</span>（Elastic Compute Cloud）</div>
            <p class="text-paragraph">
              <strong>仮想サーバー</strong>を提供するサービスです。
              様々なOSのサーバーを数分で起動できます。
              <em>（第4章で詳しく学びます）</em>
            </p>
          </div>
          <div class="card">
            <div class="aws-service-box lambda">&#9889; <span class="aws-keyword" data-service="Lambda">Lambda</span></div>
            <p class="text-paragraph">
              <strong>サーバーレス</strong>でプログラムを実行できるサービスです。
              サーバー管理不要で、コードだけに集中できます。
            </p>
          </div>

          <h3 class="section-subtitle">ネットワーキング</h3>
          <div class="card">
            <div class="aws-service-box vpc">&#128279; <span class="aws-keyword" data-service="VPC">VPC</span>（Virtual Private Cloud）</div>
            <p class="text-paragraph">
              AWS上に<strong>仮想ネットワーク</strong>を構築するサービスです。
              外部からアクセスできるエリアと内部専用エリアを分けて設計できます。
              <em>（第3章で詳しく学びます）</em>
            </p>
          </div>
          <div class="card">
            <div class="aws-service-box cloudfront">&#127760; <span class="aws-keyword" data-service="CloudFront">CloudFront</span></div>
            <p class="text-paragraph">
              <strong>CDN（コンテンツ配信ネットワーク）</strong>サービスです。
              世界中のユーザーに高速にコンテンツを配信できます。
            </p>
          </div>

          <h3 class="section-subtitle">ストレージ</h3>
          <div class="card">
            <div class="aws-service-box s3">&#128230; <span class="aws-keyword" data-service="S3">S3</span>（Simple Storage Service）</div>
            <p class="text-paragraph">
              <strong>オブジェクトストレージ</strong>サービスです。
              画像、動画、バックアップなど、あらゆるデータを保存できます。
              <em>（第6章で詳しく学びます）</em>
            </p>
          </div>

          <h3 class="section-subtitle">データベース</h3>
          <div class="card">
            <div class="aws-service-box rds">&#128451; <span class="aws-keyword" data-service="RDS">RDS</span>（Relational Database Service）</div>
            <p class="text-paragraph">
              <strong>リレーショナルデータベース</strong>を簡単に構築・運用できるサービスです。
              MySQL、PostgreSQLなど様々なDBエンジンに対応しています。
              <em>（第5章で詳しく学びます）</em>
            </p>
          </div>

          <h3 class="section-subtitle">セキュリティ・ID管理</h3>
          <div class="card">
            <div class="aws-service-box iam">&#128274; <span class="aws-keyword" data-service="IAM">IAM</span>（Identity and Access Management）</div>
            <p class="text-paragraph">
              AWSリソースへの<strong>アクセス権限を管理</strong>するサービスです。
              「誰が」「何を」できるかを細かく制御できます。
              <em>（第2章で詳しく学びます）</em>
            </p>
          </div>

          <!-- AWSサービス スライドショー -->
          <div class="inline-slideshow" id="aws-service-slideshow">
            <div class="inline-slideshow-header">
              <h3 class="inline-slideshow-title">&#128196; AWSの主要サービス 図解</h3>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="aws-service" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img class="inline-slide-image" id="aws-service-slide-img" src="images/01/aws-service01.png" alt="AWSサービス 1 / 9">
                </div>
                <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="aws-service" data-dir="next" aria-label="次のスライド">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span class="inline-slide-counter" id="aws-service-counter">1 / 9</span>
              </div>
              <div class="inline-slide-indicators" id="aws-service-indicators"></div>
            </div>
          </div>

          <script>
            initInlineSlideshow('aws-service', {
              folder: 'images/01',
              prefix: 'aws-service',
              pageCount: 9,
              imgId: 'aws-service-slide-img',
              counterId: 'aws-service-counter',
              indicatorsId: 'aws-service-indicators'
            });
          </script>

          <div class="point-box">
            <div class="point-box-title">&#128161; サービスの選び方</div>
            <p>
              最初は基本的なサービスから始めましょう。
              EC2、VPC、S3、RDS、IAMの5つを理解すれば、
              多くのシステム構築に対応できます。
            </p>
          </div>
        </div>
      `
    },
    // セクション5: リージョンとアベイラビリティゾーン
    {
      id: "1-4",
      title: "リージョンとアベイラビリティゾーン",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#127760; 1.4 リージョンとアベイラビリティゾーン</h2>

          <p class="text-paragraph">
            AWSは世界中にデータセンターを持っています。
            これらは<span class="aws-keyword" data-service="リージョン">リージョン</span>と<span class="aws-keyword" data-service="アベイラビリティゾーン">アベイラビリティゾーン（AZ）</span>
            という単位で管理されています。
          </p>

          <div class="term-box">
            <div class="term-box-title">&#128218; リージョン（Region）とは？</div>
            <p>
              AWSのデータセンターが設置されている<strong>地理的な地域</strong>のことです。
              例えば「東京リージョン」「バージニア北部リージョン」などがあります。
              各リージョンは独立しており、あるリージョンの障害が他のリージョンに影響することはありません。
            </p>
          </div>

          <h3 class="section-subtitle">主要なリージョン</h3>

          <table class="info-table">
            <thead>
              <tr>
                <th>リージョン名</th>
                <th>コード</th>
                <th>場所</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>東京</td>
                <td><code>ap-northeast-1</code></td>
                <td>日本</td>
              </tr>
              <tr>
                <td>大阪</td>
                <td><code>ap-northeast-3</code></td>
                <td>日本</td>
              </tr>
              <tr>
                <td>バージニア北部</td>
                <td><code>us-east-1</code></td>
                <td>アメリカ東海岸</td>
              </tr>
              <tr>
                <td>シンガポール</td>
                <td><code>ap-southeast-1</code></td>
                <td>シンガポール</td>
              </tr>
              <tr>
                <td>フランクフルト</td>
                <td><code>eu-central-1</code></td>
                <td>ドイツ</td>
              </tr>
            </tbody>
          </table>

          <div class="info-box">
            <div class="info-box-title">&#128161; リージョン選択のポイント</div>
            <p>
              日本のユーザー向けサービスなら<strong>東京リージョン</strong>を選びましょう。
              物理的に近いリージョンを選ぶことで、通信の遅延を最小限に抑えられます。
            </p>
          </div>

          <div class="term-box">
            <div class="term-box-title">&#128218; アベイラビリティゾーン（AZ）とは？</div>
            <p>
              リージョン内にある<strong>独立したデータセンター</strong>のことです。
              各リージョンには通常3つ以上のAZがあります。
              例えば東京リージョンには「ap-northeast-1a」「ap-northeast-1c」「ap-northeast-1d」の3つのAZがあります。
            </p>
          </div>

          <h3 class="section-subtitle">なぜAZが複数あるのか？</h3>

          <p class="text-paragraph">
            複数のAZにリソースを配置することで、<strong>高い可用性</strong>を実現できます。
            一つのAZに障害が発生しても、他のAZでサービスを継続できるためです。
          </p>

          <div class="point-box">
            <div class="point-box-title">&#128161; 可用性を高める設計</div>
            <p>
              本番環境では、<strong>複数のAZにリソースを分散配置</strong>することが推奨されます。
              これを「マルチAZ構成」と呼びます。
            </p>
          </div>

          <div class="warning-box">
            <div class="warning-box-title">&#9888; 注意</div>
            <p>
              リージョンが異なると、同じサービスでも<strong>データは共有されません</strong>。
              東京リージョンで作成したサーバーは、大阪リージョンからは見えません。
              リソースを作成する際は、必ずリージョンを確認しましょう。
            </p>
          </div>

          <!-- リージョンとAZ スライドショー -->
          <div class="inline-slideshow" id="region-az-slideshow">
            <div class="inline-slideshow-header">
              <h3 class="inline-slideshow-title">&#128196; リージョンとアベイラビリティゾーン 図解</h3>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="region-az" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img class="inline-slide-image" id="region-az-slide-img" src="images/01/region-az01.png" alt="リージョンとAZ 1 / 9">
                </div>
                <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="region-az" data-dir="next" aria-label="次のスライド">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span class="inline-slide-counter" id="region-az-counter">1 / 9</span>
              </div>
              <div class="inline-slide-indicators" id="region-az-indicators"></div>
            </div>
          </div>

          <script>
            initInlineSlideshow('region-az', {
              folder: 'images/01',
              prefix: 'region-az',
              pageCount: 9,
              imgId: 'region-az-slide-img',
              counterId: 'region-az-counter',
              indicatorsId: 'region-az-indicators'
            });
          </script>

        </div>
      `
    },
    // セクション6: AWSアカウントの作成
    {
      id: "1-5",
      title: "AWSアカウントの作成",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128100; 1.5 AWSアカウントの作成</h2>

          <p class="text-paragraph">
            AWSを使い始めるには、まず<span class="highlight">AWSアカウント</span>を作成する必要があります。
            アカウントの作成は無料で、多くのサービスには<strong>無料利用枠</strong>があります。
            無料利用枠やコスト管理については、次のセクション「<strong>AWSのコスト管理</strong>」で詳しく説明します。
          </p>

          <h3 class="section-subtitle">アカウント作成に必要なもの</h3>

          <div class="checklist">
            <h4 class="checklist-title">&#9989; 準備するもの</h4>
            <ul class="checklist-items">
              <li><strong>メールアドレス</strong>（Gmailなど、普段使用しているもの）</li>
              <li><strong>クレジットカード</strong>またはデビットカード（認証用）</li>
              <li><strong>電話番号</strong>（SMSまたは音声通話で認証）</li>
            </ul>
          </div>

          <h3 class="section-subtitle">アカウント作成の流れ</h3>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">AWSのサイトにアクセス</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">
                <a href="https://aws.amazon.com/jp/" target="_blank" rel="noopener">https://aws.amazon.com/jp/</a>
                にアクセスし、「無料アカウントの作成」をクリックします。
              </p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">基本情報・連絡先の入力</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">
                メールアドレス、パスワード、AWSアカウント名、連絡先情報を入力します。
              </p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">支払い情報・本人確認</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">
                クレジットカード情報を入力し、電話番号でSMS認証を行います。
              </p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">サポートプランの選択</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">
                学習目的であれば<strong>「ベーシックサポート（無料）」</strong>で十分です。
              </p>
            </div>
          </div>

          <div class="warning-box">
            <div class="warning-box-title">&#9888; 重要：ルートユーザーの保護</div>
            <p>
              アカウント作成時に使用したメールアドレスとパスワードでサインインするユーザーを
              <strong>「ルートユーザー」</strong>と呼びます。
              ルートユーザーはすべての権限を持つため、<strong>日常的な作業には使用しないでください</strong>。
              次章で学ぶIAMユーザーを作成し、そちらを使用することを強く推奨します。
            </p>
          </div>

          <div class="summary-box">
            <h3 class="summary-title">&#127881; 第1章 完了！</h3>
            <p class="text-paragraph">
              お疲れさまでした！この章では、AWSの基本的な概念を学びました。
            </p>
            <ul class="summary-list">
              <li>AWSはクラウドコンピューティングサービス</li>
              <li>従量課金制で初期費用ゼロ</li>
              <li>200以上のサービスから必要なものを選んで利用</li>
              <li>リージョンとAZで高可用性を実現</li>
              <li>無料利用枠でAWSを試せる</li>
            </ul>
            <p class="text-paragraph" style="margin-top: 20px;">
              次の章では、AWSのセキュリティの要である<strong>IAM（Identity and Access Management）</strong>を学びます。
            </p>
          </div>

          <div class="point-box" style="margin-top: 30px;">
            <div class="point-box-title">&#128214; AWS公式ドキュメント参照先</div>
            <ul class="feature-list">
              <li><a href="https://aws.amazon.com/what-is-cloud-computing/" target="_blank" rel="noopener">クラウドコンピューティングとは</a></li>
              <li><a href="https://aws.amazon.com/about-aws/global-infrastructure/regions_az/" target="_blank" rel="noopener">リージョンとアベイラビリティゾーン</a></li>
              <li><a href="https://aws.amazon.com/free/" target="_blank" rel="noopener">AWS無料利用枠</a></li>
              <li><a href="https://aws.amazon.com/getting-started/" target="_blank" rel="noopener">AWSはじめてガイド</a></li>
              <li><a href="https://aws.amazon.com/ec2/" target="_blank" rel="noopener">Amazon EC2</a> / <a href="https://aws.amazon.com/lambda/" target="_blank" rel="noopener">AWS Lambda</a> / <a href="https://aws.amazon.com/vpc/" target="_blank" rel="noopener">Amazon VPC</a></li>
              <li><a href="https://aws.amazon.com/s3/" target="_blank" rel="noopener">Amazon S3</a> / <a href="https://aws.amazon.com/rds/" target="_blank" rel="noopener">Amazon RDS</a> / <a href="https://aws.amazon.com/iam/" target="_blank" rel="noopener">AWS IAM</a></li>
              <li><a href="https://aws.amazon.com/cloudfront/" target="_blank" rel="noopener">Amazon CloudFront</a></li>
            </ul>
          </div>
        </div>
      `
    },
    // セクション7: AWSのコスト管理
    {
      id: "1-6",
      title: "AWSのコスト管理",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128176; 1.6 AWSのコスト管理</h2>

          <p class="text-paragraph">
            AWSは従量課金制のため、<strong>想定外の課金を防ぐためのコスト管理</strong>が重要です。
            ここでは、AWSを安心して使うために知っておきたい3つのトピックを紹介します。
          </p>

          <!-- AWS Budgets -->
          <h3 class="section-subtitle">&#128276; AWS Budgets（予算アラート）</h3>

          <p class="text-paragraph">
            <strong>AWS Budgets</strong> は、AWSの利用料金や使用量に対して
            <strong>予算を設定し、超過しそうな場合にアラート通知を受け取る</strong>ためのサービスです。
            「知らないうちに高額請求が発生していた」という事態を防ぐために、
            AWSアカウントを作成したら<strong>最初に設定しておくこと</strong>が推奨されます。
          </p>

          <div class="term-box">
            <div class="term-box-title">&#128218; 設定できる予算の種類</div>
            <table class="info-table">
              <thead>
                <tr><th>予算の種類</th><th>概要</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>コスト予算</strong></td><td>月額などの金額ベースで予算上限を設定する。最も基本的でよく使われる予算タイプ</td></tr>
                <tr><td><strong>使用量予算</strong></td><td>特定サービスの使用量（例：<span class="aws-keyword" data-service="EC2">EC2</span>の稼働時間、<span class="aws-keyword" data-service="S3">S3</span>のストレージ容量）に対して上限を設定する</td></tr>
              </tbody>
            </table>
            <p style="margin-top: 12px; font-size: 13px; color: #666;">
              ※他にも予約インスタンス（RI）やSavings Plansの利用率・カバレッジ予算がありますが、初心者はまず<strong>コスト予算</strong>を設定すれば十分です。
            </p>
          </div>

          <div class="point-box">
            <div class="point-box-title">&#128161; 予算の作成手順</div>

            <p class="text-paragraph" style="margin-bottom: 12px;">
              はじめに<strong>「コスト予算」</strong>を1つ作成するところから始めましょう。
            </p>

            <div class="step-container" style="margin: 0;">
              <div class="step-header"><span class="step-number">1</span><span class="step-title">予算額を決める</span></div>
              <div class="step-content">
                <p class="text-paragraph">月額の上限額を決めます。</p>
                <ul class="feature-list" style="margin-top: 8px;">
                  <li><strong>利用実績がある場合</strong> ── AWS Cost Explorer で過去の平均支出を確認して目安にする</li>
                  <li><strong>これから始める場合</strong> ── 「この金額を超えたら困る」という上限額を設定する（例：月10ドル）</li>
                </ul>
              </div>
            </div>

            <div class="step-container" style="margin: 0;">
              <div class="step-header"><span class="step-number">2</span><span class="step-title">AWS Budgets で予算を作成</span></div>
              <div class="step-content">
                <p class="text-paragraph">AWSマネジメントコンソールから「Budgets」を開き、以下を設定します。</p>
                <table class="info-table" style="margin-top: 8px;">
                  <thead><tr><th>設定項目</th><th>推奨値</th></tr></thead>
                  <tbody>
                    <tr><td><strong>予算タイプ</strong></td><td>コスト予算</td></tr>
                    <tr><td><strong>期間</strong></td><td>月次</td></tr>
                    <tr><td><strong>予算編成方法</strong></td><td>固定</td></tr>
                    <tr><td><strong>予算金額</strong></td><td>ステップ1で決めた額</td></tr>
                  </tbody>
                </table>
                <p class="text-paragraph" style="margin-top: 8px; font-size: 13px; color: #666;">
                  ※初心者はスコープ（対象範囲）を絞らず、<strong>全サービスの合計コスト</strong>を監視するのがおすすめです。
                </p>
              </div>
            </div>

            <div class="step-container" style="margin: 0;">
              <div class="step-header"><span class="step-number">3</span><span class="step-title">アラート通知を設定</span></div>
              <div class="step-content">
                <p class="text-paragraph"><strong>2つの閾値</strong>でメール通知を設定するのが推奨されています。</p>
                <table class="info-table" style="margin-top: 8px;">
                  <thead><tr><th>アラート</th><th>閾値</th><th>目的</th></tr></thead>
                  <tbody>
                    <tr><td><strong>1つ目</strong></td><td>予算の <strong>50%</strong> に到達</td><td>早めの注意喚起（利用状況を確認するきっかけ）</td></tr>
                    <tr><td><strong>2つ目</strong></td><td>予算の <strong>75%</strong> に到達</td><td>警告（不要なリソースの停止を検討）</td></tr>
                  </tbody>
                </table>
                <p class="text-paragraph" style="margin-top: 8px; font-size: 13px; color: #666;">
                  通知先は<strong>メールアドレス</strong>が手軽です。SNS トピックを使えば Slack などへの通知も可能です。
                </p>
              </div>
            </div>
          </div>

          <div class="warning-box">
            <div class="warning-box-title">&#9888; 注意</div>
            <ul class="feature-list">
              <li>AWS Budgets は基本的には<strong>「通知」するサービス</strong>です。予算を超えても自動的にサービスが停止するわけではありません。ただし<strong>Budget Actions</strong>を設定すれば、閾値超過時にリソースの追加を制限するIAMポリシーを自動適用するなどの対応も可能です</li>
              <li>データは1日に最大3回更新されるため、<strong>リアルタイムではありません</strong>。通知にタイムラグが発生する場合があります</li>
              <li>通知が多すぎると無視してしまいがちです。<strong>重要なタイミングだけ届く</strong>ようにバランスを取りましょう</li>
            </ul>
          </div>

          <div class="point-box" style="margin-top: 20px;">
            <div class="point-box-title">&#128214; 参考</div>
            <p class="text-paragraph" style="font-size: 13px;">
              AWS Budgets の詳細な設定方法については
              <a href="https://aws.amazon.com/startups/learn/why-every-startup-should-set-up-a-budget-and-how-aws-budgets-makes-it-easy?lang=ja" target="_blank" rel="noopener">AWS公式：予算の設定方法ガイド</a>
              を参照してください。
            </p>
          </div>

          <!-- 無料利用枠 -->
          <h3 class="section-subtitle">&#127381; 無料利用枠（Free Tier）</h3>

          <p class="text-paragraph">
            AWSでは、初めてのユーザーや学習目的のユーザーが<strong>無料でAWSサービスを試せる仕組み</strong>を提供しています。
          </p>

          <div class="warning-box" style="margin-top: 20px;">
            <div class="warning-box-title">&#9888; 重要：無料利用枠は情報の移り変わりが早い</div>
            <p>
              AWSの無料利用枠は、<strong>対象サービス・無料枠の上限値・適用条件が頻繁に変更</strong>されます。
              利用前には必ず公式ページで最新情報を確認してください。
            </p>
            <p style="margin-top: 12px;">
              また、無料枠の上限を超えると<strong>自動的に課金が発生</strong>します。
              AWS Budgets で<strong>無料枠超過アラート</strong>を設定しておくと安心です。
            </p>
            <p style="margin-top: 16px; text-align: center;">
              <a href="https://aws.amazon.com/free/" target="_blank" rel="noopener"
                 style="display: inline-block; background: #FF9900; color: #fff; font-weight: bold; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-size: 15px;">
                &#128073; AWS 無料利用枠 公式ページで最新情報を確認する
              </a>
            </p>
          </div>

          <!-- Pricing Calculator -->
          <h3 class="section-subtitle">&#128202; AWS Pricing Calculator（料金見積ツール）</h3>

          <p class="text-paragraph">
            <strong>AWS Pricing Calculator</strong> は、AWSサービスの利用料金を
            <strong>事前に見積もるための無料のWebツール</strong>です。
            AWSアカウントがなくても利用でき、ブラウザからアクセスするだけで使えます。
          </p>

          <div class="term-box">
            <div class="term-box-title">&#128218; 主な機能</div>
            <table class="info-table">
              <thead>
                <tr><th>機能</th><th>説明</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>料金見積もり</strong></td><td>サービスの構成を入力すると、月額・年額の見積もりを自動計算</td></tr>
                <tr><td><strong>グループ化</strong></td><td>「Webサーバー」「データベース」などアーキテクチャ別に分類可能</td></tr>
                <tr><td><strong>保存・共有</strong></td><td>見積もりをリンクとして保存し、URLで他の人と共有可能</td></tr>
                <tr><td><strong>エクスポート</strong></td><td>CSV / PDF 形式でダウンロード可能</td></tr>
              </tbody>
            </table>
          </div>

          <div class="point-box">
            <div class="point-box-title">&#128161; 見積もり作成の流れ</div>

            <div class="step-container" style="margin: 0;">
              <div class="step-header"><span class="step-number">1</span><span class="step-title">Pricing Calculator を開く</span></div>
              <div class="step-content"><p class="text-paragraph"><a href="https://calculator.aws/" target="_blank" rel="noopener">https://calculator.aws/</a> にアクセスし、<strong>「見積りの作成」</strong>をクリックします。AWSアカウントは不要です。</p></div>
            </div>

            <div class="step-container" style="margin: 0;">
              <div class="step-header"><span class="step-number">2</span><span class="step-title">サービスを検索して追加</span></div>
              <div class="step-content"><p class="text-paragraph">「サービスの追加」ページで、見積もりしたいサービス名（例：「EC2」）を検索し、<strong>「設定」</strong>をクリックします。</p></div>
            </div>

            <div class="step-container" style="margin: 0;">
              <div class="step-header"><span class="step-number">3</span><span class="step-title">サービスの構成を入力</span></div>
              <div class="step-content">
                <p class="text-paragraph">以下のような項目を入力します。</p>
                <ul class="feature-list" style="margin-top: 8px;">
                  <li><strong>説明</strong> ── この見積もりの用途をメモ（例：「開発用Webサーバー」）</li>
                  <li><strong>リージョン</strong> ── 使用するリージョンを選択（例：東京）</li>
                  <li><strong>サービス仕様</strong> ── インスタンスタイプ、台数、ストレージ容量など</li>
                </ul>
                <p class="text-paragraph" style="margin-top: 8px; font-size: 13px; color: #666;">入力内容に応じて、前払いコストと月額コストがリアルタイムで自動計算されます。</p>
              </div>
            </div>

            <div class="step-container" style="margin: 0;">
              <div class="step-header"><span class="step-number">4</span><span class="step-title">保存してサービスを追加</span></div>
              <div class="step-content"><p class="text-paragraph"><strong>「サービスを保存して追加する」</strong>をクリックすると見積もりに追加されます。必要に応じてステップ2〜3を繰り返し、複数サービスを追加できます。</p></div>
            </div>

            <div class="step-container" style="margin: 0;">
              <div class="step-header"><span class="step-number">5</span><span class="step-title">見積もりを確認・共有</span></div>
              <div class="step-content">
                <p class="text-paragraph"><strong>「概要の表示」</strong>をクリックすると、全体のコスト概要を確認できます。</p>
                <ul class="feature-list" style="margin-top: 8px;">
                  <li><strong>共有</strong> ── 見積もりのリンクを取得して、URLで他の人に共有</li>
                  <li><strong>エクスポート</strong> ── CSV / PDF 形式でダウンロード（稟議資料などに活用）</li>
                  <li><strong>編集</strong> ── 追加済みサービスの編集アイコンからいつでも構成を変更可能</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="point-box" style="margin-top: 20px;">
            <div class="point-box-title">&#128214; 参考</div>
            <p class="text-paragraph" style="font-size: 13px;">
              見積もり作成の詳細な手順については
              <a href="https://docs.aws.amazon.com/ja_jp/pricing-calculator/latest/userguide/create-configure-estimate.html" target="_blank" rel="noopener">AWS公式：見積もりの作成と設定</a>
              を参照してください。
            </p>
          </div>

          <div class="summary-box" style="margin-top: 30px;">
            <h3 class="summary-title">&#128640; AWSを安心して使うためのおすすめの流れ</h3>
            <div class="step-container" style="margin: 0;">
              <div class="step-header"><span class="step-number">1</span><span class="step-title">Pricing Calculator で料金を見積もる</span></div>
            </div>
            <div class="step-container" style="margin: 0;">
              <div class="step-header"><span class="step-number">2</span><span class="step-title">無料利用枠の範囲を確認する</span></div>
            </div>
            <div class="step-container" style="margin: 0;">
              <div class="step-header"><span class="step-number">3</span><span class="step-title">AWS Budgets でアラートを設定する</span></div>
            </div>
            <div class="step-container" style="margin: 0;">
              <div class="step-header"><span class="step-number">4</span><span class="step-title">サービスを利用開始！</span></div>
            </div>
          </div>

          <div class="point-box" style="margin-top: 30px;">
            <div class="point-box-title">&#128214; AWS公式ドキュメント参照先</div>
            <ul class="feature-list">
              <li><a href="https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html" target="_blank" rel="noopener">AWS Budgets ユーザーガイド</a></li>
              <li><a href="https://aws.amazon.com/free/" target="_blank" rel="noopener">AWS 無料利用枠</a></li>
              <li><a href="https://calculator.aws/" target="_blank" rel="noopener">AWS Pricing Calculator</a></li>
              <li><a href="https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html" target="_blank" rel="noopener">AWS Pricing Calculator ユーザーガイド</a></li>
            </ul>
          </div>
        </div>
      `
    },
    // セクション8: 理解度テスト
    {
      id: "1-quiz",
      title: "第1章 理解度テスト",
      type: "quiz",
      questions: [
        {
          question: "AWSの料金体系として正しいものはどれですか？",
          options: [
            { label: "A", text: "使った分だけ支払う従量課金制" },
            { label: "B", text: "月額固定料金制" },
            { label: "C", text: "年間契約が必須で、前払いが必要" },
            { label: "D", text: "初期費用として最低100万円が必要" }
          ],
          correct: 0,
          explanation: {
            correct: "その通りです！AWSは「使った分だけ支払う」従量課金制を採用しており、初期費用ゼロで始められます。電気代のようなイメージです。",
            incorrect: "不正解です。AWSは従量課金制を採用しており、使った分だけ支払います。初期費用はゼロで、年間契約も必須ではありません。"
          }
        },
        {
          question: "リージョンについて正しい説明はどれですか？",
          options: [
            { label: "A", text: "AWSの営業地域のこと" },
            { label: "B", text: "AWSのデータセンターが設置されている地理的な地域" },
            { label: "C", text: "AWSのサポートチームが所在する場所" },
            { label: "D", text: "AWSの本社がある場所" }
          ],
          correct: 1,
          explanation: {
            correct: "正解です！リージョンはAWSのデータセンターが設置されている地理的な地域のことで、東京リージョン、バージニア北部リージョンなどがあります。",
            incorrect: "不正解です。リージョンはAWSのデータセンターが設置されている地理的な地域のことです。日本には東京と大阪のリージョンがあります。"
          }
        },
        {
          question: "アベイラビリティゾーン（AZ）の主な目的は何ですか？",
          options: [
            { label: "A", text: "コストを削減するため" },
            { label: "B", text: "通信速度を上げるため" },
            { label: "C", text: "セキュリティを向上させるため" },
            { label: "D", text: "高可用性（障害に強いシステム）を実現するため" }
          ],
          correct: 3,
          explanation: {
            correct: "正解です！複数のAZにリソースを分散配置することで、一つのAZに障害が発生しても他のAZでサービスを継続できる高可用性を実現できます。",
            incorrect: "不正解です。AZの主な目的は高可用性の実現です。複数のAZにリソースを配置することで、障害に強いシステムを構築できます。"
          }
        },
        {
          question: "日本のユーザー向けサービスを構築する場合、最も適切なリージョンはどれですか？",
          options: [
            { label: "A", text: "バージニア北部（us-east-1）" },
            { label: "B", text: "シンガポール（ap-southeast-1）" },
            { label: "C", text: "東京（ap-northeast-1）" },
            { label: "D", text: "フランクフルト（eu-central-1）" }
          ],
          correct: 2,
          explanation: {
            correct: "正解です！日本のユーザー向けサービスなら、物理的に最も近い東京リージョン（ap-northeast-1）を選ぶことで、通信の遅延を最小限に抑えられます。",
            incorrect: "不正解です。日本のユーザー向けサービスには、物理的に最も近い東京リージョン（ap-northeast-1）を選ぶのが最適です。"
          }
        },
        {
          question: "AWSアカウント作成時に登録したメールアドレスでサインインするユーザーを何と呼びますか？",
          options: [
            { label: "A", text: "ルートユーザー" },
            { label: "B", text: "IAMユーザー" },
            { label: "C", text: "管理者ユーザー" },
            { label: "D", text: "マスターユーザー" }
          ],
          correct: 0,
          explanation: {
            correct: "正解です！アカウント作成時に使用したメールアドレスでサインインするユーザーは「ルートユーザー」と呼ばれ、すべての権限を持っています。日常的な作業には使用せず、IAMユーザーを作成して使用することが推奨されます。",
            incorrect: "不正解です。アカウント作成時のメールアドレスでサインインするユーザーは「ルートユーザー」と呼ばれます。すべての権限を持つため、日常的な作業には使用しないことが推奨されます。"
          }
        }
      ]
    }
  ]
};
