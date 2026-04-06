// ========================================
// 第3章: 仮想ネットワーク構築サービス（VPC）
// ========================================
const chapter03 = {
  id: 3,
  title: "仮想ネットワーク構築サービス（VPC）",
  sections: [
    // セクション1: この章で学ぶこと
    {
      id: "3-intro",
      title: "この章で学ぶこと",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <div class="chapter-intro-banner">
            <div class="chapter-number">CHAPTER 03</div>
            <h1 class="chapter-main-title">仮想ネットワーク構築（VPC）</h1>
            <p class="chapter-subtitle">AWS上に専用のネットワークを構築しよう</p>
          </div>

          <div class="learning-goals">
            <h3 class="learning-goals-title">&#127919; この章の学習目標</h3>
            <ul class="learning-goals-list">
              <li>VPCとは何かを理解する</li>
              <li>サブネットの役割と種類を説明できる</li>
              <li>パブリック/プライベートネットワークの設計を理解する</li>
              <li>基本的なネットワーク構成を構築できる</li>
            </ul>
          </div>

          <h2 class="section-title">&#128218; はじめに</h2>

          <p class="text-paragraph">
            AWSでサーバー（<span class="aws-keyword" data-service="EC2">EC2</span>）やデータベース（<span class="aws-keyword" data-service="RDS">RDS</span>）を構築する前に、
            まず<span class="highlight">ネットワークの基盤</span>を用意する必要があります。
            それが<strong><span class="aws-keyword" data-service="VPC">VPC</span>（Virtual Private Cloud）</strong>です。
          </p>

          <div class="info-box">
            <div class="info-box-title">&#128161; なぜネットワークを学ぶの？</div>
            <p>
              VPCは、AWSの多くのサービスの<strong>土台</strong>となります。
              <span class="aws-keyword" data-service="EC2">EC2</span>、<span class="aws-keyword" data-service="RDS">RDS</span>、<span class="aws-keyword" data-service="Lambda">Lambda</span>など、様々なサービスはVPCの上に構築されます。
              VPCを理解することで、セキュアで効率的なシステム設計ができるようになります。
            </p>
          </div>

          <h3 class="section-subtitle">この章の構成</h3>
          <ul class="feature-list">
            <li><strong>3.1 VPCとは</strong> - VPCの基本概念を学びます</li>
            <li><strong>3.2 VPCとサブネット</strong> - ネットワークの分割方法を理解します</li>
            <li><strong>3.3 ネットワークの構築</strong> - 実際の構成例を見ていきます</li>
            <li><strong>参考情報</strong> - IPv4/IPv6アドレスについて</li>
            <li><strong>理解度テスト</strong> - この章の内容を確認します</li>
          </ul>
        </div>
      `
    },
    // セクション2: VPCとは
    {
      id: "3-1",
      title: "VPCとは",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128279; 3.1 VPCとは</h2>

          <p class="text-paragraph">
            <span class="highlight">VPC（Virtual Private Cloud）</span>は、
            AWS上に作る<strong>自分専用の仮想ネットワーク空間</strong>です。
          </p>

          <div class="term-box">
            <div class="term-box-title">&#128218; VPCを身近な例で理解しよう</div>
            <p>
              VPCは、<strong>会社のオフィスビル</strong>のようなものです。
            </p>
            <ul class="feature-list" style="margin-top: 12px;">
              <li><strong>VPC</strong> = オフィスビル全体（自分専用の空間）</li>
              <li><strong><span class="aws-keyword" data-service="サブネット">サブネット</span></strong> = 各フロア（部署ごとのエリア）</li>
              <li><strong><span class="aws-keyword" data-service="EC2">EC2</span></strong> = フロア内の個室（実際にサーバーを置く場所）</li>
              <li><strong><span class="aws-keyword" data-service="インターネットゲートウェイ">インターネットゲートウェイ</span></strong> = ビルの正面玄関（外部との出入口）</li>
            </ul>
          </div>

          <h3 class="section-subtitle">VPCの特徴</h3>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128274;</span>論理的に分離された空間</h4>
            <p class="text-paragraph">
              VPCは、他のユーザーのネットワークから<strong>完全に分離</strong>されています。
            </p>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#127760;</span>IPアドレス範囲を自由に設定</h4>
            <p class="text-paragraph">
              VPC作成時に、使用するIPアドレスの範囲を自分で決められます。
              例えば「10.0.0.0/16」のように指定します。
            </p>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128737;</span>セキュリティを細かく制御</h4>
            <p class="text-paragraph">
              <span class="aws-keyword" data-service="セキュリティグループ">セキュリティグループ</span>やネットワークACLを使って、
              <strong>通信を許可/拒否するルール</strong>を設定できます。
            </p>
          </div>

          <h3 class="section-subtitle">CIDRブロック（IPアドレス範囲）</h3>

          <p class="text-paragraph">
            VPCを作成する際に、<strong>CIDRブロック</strong>という形式でIPアドレス範囲を指定します。
            「10.0.0.0/16」のように表し、「/16」の数字が小さいほど使えるIPアドレスが多くなります。
          </p>

          <table class="info-table">
            <thead>
              <tr>
                <th>CIDR表記</th>
                <th>使用可能なIPアドレス数</th>
                <th>用途例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>/16</code></td>
                <td>約65,000個</td>
                <td>大規模なVPC</td>
              </tr>
              <tr>
                <td><code>/24</code></td>
                <td>約250個</td>
                <td>中小規模のサブネット</td>
              </tr>
              <tr>
                <td><code>/28</code></td>
                <td>16個</td>
                <td>小規模なサブネット</td>
              </tr>
            </tbody>
          </table>

          <div class="info-box">
            <div class="info-box-title">&#128161; 予約アドレスについて</div>
            <p>
              AWSはサブネットごとに<strong>5個のIPアドレスを予約</strong>するため、
              実際に使用できるアドレス数は上記より少なくなります。
              例えば /24 では256個中251個、/28 では16個中11個が使用可能です。
            </p>
          </div>

          <div class="point-box">
            <div class="point-box-title">&#128161; デフォルトVPC</div>
            <p>
              AWSアカウントを作成すると、各リージョンに<strong>デフォルトVPC</strong>が
              自動的に作成されます。学習目的であればデフォルトVPCを使うこともできますが、
              本番環境では目的に合わせたVPCを新規作成することをお勧めします。
            </p>
          </div>

          <!-- VPC スライドショー -->
          <div class="inline-slideshow" id="vpc-slideshow">
            <div class="inline-slideshow-header">
              <h3 class="inline-slideshow-title">&#128196; VPC 図解</h3>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="vpc" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img class="inline-slide-image" id="vpc-slide-img" src="images/03/vpc01.png" alt="VPC 1 / 2">
                </div>
                <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="vpc" data-dir="next" aria-label="次のスライド">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span class="inline-slide-counter" id="vpc-counter">1 / 2</span>
              </div>
              <div class="inline-slide-indicators" id="vpc-indicators"></div>
            </div>
          </div>

          <script>
            initInlineSlideshow('vpc', {
              folder: 'images/03',
              prefix: 'vpc',
              pageCount: 2,
              imgId: 'vpc-slide-img',
              counterId: 'vpc-counter',
              indicatorsId: 'vpc-indicators'
            });
          </script>

        </div>
      `
    },
    // セクション3: VPCとサブネット
    {
      id: "3-2",
      title: "VPCとサブネット",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128193; 3.2 VPCとサブネット</h2>

          <p class="text-paragraph">
            VPCの中は<span class="highlight">サブネット</span>という単位でさらに細かく分割します。
            サブネットは「<strong>ネットワークの部屋分け</strong>」のようなものです。
            各サブネットは、特定の<span class="aws-keyword" data-service="アベイラビリティゾーン">アベイラビリティゾーン</span>（AZ）に配置されます。
          </p>

          <h3 class="section-subtitle">パブリックサブネットとプライベートサブネット</h3>

          <p class="text-paragraph">
            サブネットは、インターネットとの接続方法によって2種類に分類されます。
          </p>

          <div class="comparison-container">
            <div class="good-example">
              <div class="example-header">
                <span class="example-badge">パブリック</span>
                <span class="example-title">パブリックサブネット</span>
              </div>
              <ul class="feature-list">
                <li>インターネットに<strong>直接アクセス可能</strong></li>
                <li>Webサーバーなどを配置</li>
                <li>グローバルIPアドレスを付与できる</li>
                <li>インターネットゲートウェイを使用</li>
              </ul>
            </div>
            <div class="bad-example" style="background: #f0f7ff; border: 1px solid #b3d7ff;">
              <div class="example-header">
                <span class="example-badge" style="background: #146EB4;">プライベート</span>
                <span class="example-title" style="color: #146EB4;">プライベートサブネット</span>
              </div>
              <ul class="feature-list">
                <li>インターネットから<strong>直接アクセス不可</strong></li>
                <li>データベースなどを配置</li>
                <li>外部からの攻撃を防ぐ</li>
                <li>NATゲートウェイ経由で外部接続</li>
              </ul>
            </div>
          </div>

          <div class="point-box">
            <div class="point-box-title">&#128737; なぜサブネットを分けるの？</div>
            <p>
              Webサーバーは外部からアクセスが必要ですが、データベースは外部から直接アクセスさせたくありません。
              <strong>用途に応じてサブネットを分ける</strong>ことで、セキュリティを高めることができます。
            </p>
          </div>

          <!-- サブネット スライドショー -->
          <div class="inline-slideshow" id="subnet-slideshow">
            <div class="inline-slideshow-header">
              <h3 class="inline-slideshow-title">&#128196; サブネット 図解</h3>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="subnet" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img class="inline-slide-image" id="subnet-slide-img" src="images/03/subnet01.png" alt="サブネット 1 / 3">
                </div>
                <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="subnet" data-dir="next" aria-label="次のスライド">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span class="inline-slide-counter" id="subnet-counter">1 / 3</span>
              </div>
              <div class="inline-slide-indicators" id="subnet-indicators"></div>
            </div>
          </div>

          <script>
            initInlineSlideshow('subnet', {
              folder: 'images/03',
              prefix: 'subnet',
              pageCount: 3,
              imgId: 'subnet-slide-img',
              counterId: 'subnet-counter',
              indicatorsId: 'subnet-indicators'
            });
          </script>

          <h3 class="section-subtitle">主要なコンポーネント</h3>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#127760;</span><span class="aws-keyword" data-service="インターネットゲートウェイ">インターネットゲートウェイ</span>（IGW）</h4>
            <p class="text-paragraph">
              VPCとインターネットを接続するための<strong>出入口</strong>です。
              パブリックサブネットのリソースがインターネットと通信するために必要です。
            </p>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128257;</span><span class="aws-keyword" data-service="NATゲートウェイ">NATゲートウェイ</span></h4>
            <p class="text-paragraph">
              プライベートサブネットのリソースが、<strong>外部へ接続する</strong>ための仕組みです。
              外部からの直接アクセスは許可せず、内部から外部への通信のみ許可します。
              例えば、ソフトウェアのアップデートで外部にアクセスする場合に使用します。
            </p>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128203;</span><span class="aws-keyword" data-service="ルートテーブル">ルートテーブル</span></h4>
            <p class="text-paragraph">
              ネットワークトラフィックの<strong>行き先を決めるルール表</strong>です。
              「この宛先への通信は、ここを経由する」というルールを定義します。
            </p>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128737;</span><span class="aws-keyword" data-service="セキュリティグループ">セキュリティグループ</span></h4>
            <p class="text-paragraph">
              <span class="aws-keyword" data-service="EC2">EC2</span>インスタンスなどのリソースに対する<strong>仮想ファイアウォール</strong>です。
              インバウンド（受信）とアウトバウンド（送信）のルールを設定します。
              セキュリティグループは<strong>ステートフル</strong>（許可した通信の戻りは自動許可）です。
            </p>
            <div class="info-box">
              <div class="info-box-title">&#128161; ネットワークACLとの違い</div>
              <p>
                ネットワークACLは<strong>サブネット単位</strong>で適用されるステートレスなファイアウォールです。
                セキュリティグループと異なり、<strong>許可と拒否の両方</strong>を設定できます。
              </p>
            </div>
            <p class="text-paragraph" style="font-weight: 600; margin-bottom: 8px;">例：Webサーバー用セキュリティグループ（インバウンドルール）</p>
            <table class="info-table">
              <thead>
                <tr>
                  <th>プロトコル</th>
                  <th>ポート</th>
                  <th>ソース</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HTTP</td>
                  <td>80</td>
                  <td><code>0.0.0.0/0</code>（どこからでも）</td>
                </tr>
                <tr>
                  <td>HTTPS</td>
                  <td>443</td>
                  <td><code>0.0.0.0/0</code>（どこからでも）</td>
                </tr>
                <tr>
                  <td>SSH</td>
                  <td>22</td>
                  <td>会社のIPアドレスのみ</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- コンポーネント スライドショー -->
          <div class="inline-slideshow" id="component-slideshow">
            <div class="inline-slideshow-header">
              <h3 class="inline-slideshow-title">&#128196; VPCの主要コンポーネント 図解</h3>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="component" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img class="inline-slide-image" id="component-slide-img" src="images/03/component01.png" alt="コンポーネント 1 / 4">
                </div>
                <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="component" data-dir="next" aria-label="次のスライド">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span class="inline-slide-counter" id="component-counter">1 / 4</span>
              </div>
              <div class="inline-slide-indicators" id="component-indicators"></div>
            </div>
          </div>

          <script>
            initInlineSlideshow('component', {
              folder: 'images/03',
              prefix: 'component',
              pageCount: 4,
              imgId: 'component-slide-img',
              counterId: 'component-counter',
              indicatorsId: 'component-indicators'
            });
          </script>

        </div>
      `
    },
    // セクション4: ネットワークの構築
    {
      id: "3-3",
      title: "ネットワークの構築",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128736; 3.3 ネットワークの構築</h2>

          <p class="text-paragraph">
            ここでは、実際にVPCを構築する際の<span class="highlight">基本的な流れ</span>を説明します。
          </p>

          <h3 class="section-subtitle">VPC構築の流れ</h3>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">VPCの作成</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">
                CIDRブロックを指定してVPCを作成します。例：<code>10.0.0.0/16</code>
              </p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">サブネットの作成</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">
                パブリックサブネットとプライベートサブネットを作成します。
                高可用性のため、<strong>複数のAZに配置</strong>することが推奨されます。
              </p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">インターネットゲートウェイの作成と接続</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">
                インターネットゲートウェイを作成し、VPCにアタッチします。
              </p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">ルートテーブルの設定</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">
                パブリックサブネット用のルートテーブルに、
                インターネットゲートウェイへのルートを追加します。
              </p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">5</span>
              <span class="step-title">セキュリティグループの作成</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">
                用途に応じたセキュリティグループを作成します。
                Webサーバー用、データベース用など、役割ごとに分けると管理しやすいです。
              </p>
            </div>
          </div>

          <h3 class="section-subtitle">マルチAZ構成</h3>

          <p class="text-paragraph">
            本番環境では、<span class="highlight">複数のアベイラビリティゾーン（AZ）</span>に
            リソースを配置することで、高い可用性を実現します。
          </p>

          <div class="point-box">
            <div class="point-box-title">&#128161; マルチAZのメリット</div>
            <ul class="feature-list">
              <li>一つのAZに障害が発生しても、サービスを継続できる</li>
              <li>ロードバランサーでトラフィックを分散できる</li>
              <li>RDSのマルチAZ配置でデータベースの可用性を向上</li>
            </ul>
          </div>

          <div class="warning-box">
            <div class="warning-box-title">&#9888; コストに注意</div>
            <p>
              NATゲートウェイは<strong>時間単位 + データ処理量</strong>で課金されます。
              学習目的で作成した場合は、使用後に削除することをお勧めします。
            </p>
          </div>
        </div>
      `
    },
    // セクション5: 参考情報
    {
      id: "3-ref",
      title: "（参考）IPアドレスについて",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128214; （参考）IPアドレスについて</h2>

          <p class="text-paragraph">
            ここでは、VPCを理解する上で役立つ<span class="highlight">IPアドレスの基礎知識</span>を補足します。
          </p>

          <h3 class="section-subtitle">IPv4アドレス</h3>

          <p class="text-paragraph">
            <strong>IPv4</strong>は、現在最も広く使われているIPアドレスの形式です。
            「192.168.1.1」のように、4つの数字をドットで区切った形式で表されます。
          </p>

          <div class="comparison-container">
            <div class="good-example">
              <div class="example-header">
                <span class="example-badge" style="background: #1A8754;">プライベートIP</span>
              </div>
              <p class="text-paragraph">
                <strong>VPC内部で使用</strong>するIPアドレス。
                インターネットからは直接アクセスできません。
              </p>
              <div class="code-block">
例：10.0.1.10 / 172.16.0.50 / 192.168.1.100</div>
            </div>
            <div class="good-example">
              <div class="example-header">
                <span class="example-badge" style="background: #146EB4;">パブリックIP</span>
              </div>
              <p class="text-paragraph">
                <strong>インターネットからアクセス可能</strong>なIPアドレス。
                EC2インスタンスに割り当てることで外部公開できます。
              </p>
              <div class="code-block">
例：54.250.xxx.xxx / 52.196.xxx.xxx</div>
            </div>
          </div>

          <h3 class="section-subtitle">Elastic IP（EIP）</h3>

          <p class="text-paragraph">
            通常のパブリックIPアドレスは、EC2インスタンスを停止/起動すると変わってしまいます。
            <strong>Elastic IP</strong>を使うと、固定のIPアドレスを保持できます。
          </p>

          <div class="warning-box">
            <div class="warning-box-title">&#9888; 課金に注意</div>
            <p>
              Elastic IPは、<strong>使用中・未使用に関わらず課金</strong>されます。
              すべてのパブリックIPv4アドレスが課金対象です。
              不要になったら解放することを忘れないでください。
              最新の料金は<a href="https://aws.amazon.com/vpc/pricing/" target="_blank" rel="noopener">VPC料金ページ</a>をご確認ください。
            </p>
          </div>

          <h3 class="section-subtitle">IPv6への対応</h3>

          <p class="text-paragraph">
            AWSのVPCは<strong>IPv6にも対応</strong>しています。
            IPv4アドレスの枯渇に対応するため、IPv6の利用が増えています。
          </p>

          <div class="summary-box">
            <h3 class="summary-title">&#127881; 第3章 完了！</h3>
            <p class="text-paragraph">
              お疲れさまでした！この章では、VPCの基本を学びました。
            </p>
            <ul class="summary-list">
              <li>VPCはAWS上の仮想ネットワーク空間</li>
              <li>サブネットでVPCを分割（パブリック/プライベート）</li>
              <li>インターネットゲートウェイで外部と接続</li>
              <li>セキュリティグループで通信を制御</li>
              <li>マルチAZ構成で高可用性を実現</li>
            </ul>
            <p class="text-paragraph" style="margin-top: 20px;">
              次の章では、VPC上にサーバーを構築する<strong>EC2（Elastic Compute Cloud）</strong>を学びます。
            </p>
          </div>

          <div class="point-box" style="margin-top: 30px;">
            <div class="point-box-title">&#128214; AWS公式ドキュメント参照先</div>
            <ul class="feature-list">
              <li><a href="https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html" target="_blank" rel="noopener">VPCとは（User Guide）</a></li>
              <li><a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-cidr-blocks.html" target="_blank" rel="noopener">VPC CIDRブロック</a> / <a href="https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html" target="_blank" rel="noopener">サブネット</a></li>
              <li><a href="https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html" target="_blank" rel="noopener">インターネットゲートウェイ</a></li>
              <li><a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html" target="_blank" rel="noopener">NATゲートウェイ</a></li>
              <li><a href="https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html" target="_blank" rel="noopener">ルートテーブル</a></li>
              <li><a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html" target="_blank" rel="noopener">セキュリティグループ</a> / <a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html" target="_blank" rel="noopener">ネットワークACL</a></li>
              <li><a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html" target="_blank" rel="noopener">Elastic IPアドレス</a></li>
              <li><a href="https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc.html" target="_blank" rel="noopener">デフォルトVPC</a> / <a href="https://aws.amazon.com/vpc/pricing/" target="_blank" rel="noopener">VPC料金</a></li>
            </ul>
          </div>
        </div>
      `
    },
    // ハンズオン1: VPCを作成する
    {
      id: "3-handson1",
      title: "ハンズオン：VPCを作成する",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128736; ハンズオン：VPCを作成する</h2>
          
          <div class="point-box">
            <ul class="feature-list">
              <li><strong>操作場所：</strong> AWSマネジメントコンソール</li>
              <li><strong>ゴール：</strong> EC2インスタンスを配置するためのネットワークの土台を作成する。</li>
            </ul>
          </div>

          <div class="info-box">
            <div class="info-box-title">&#128193; 土台の全体像</div>
            <p>今回作成するネットワークの構成は以下の通りです。</p>
            <ul class="feature-list" style="margin-bottom: 0;">
              <li><strong>VPC</strong>
                <ul class="feature-list">
                  <li><strong>サブネット</strong>
                    <ul class="feature-list">
                      <li>プライベートサブネット</li>
                      <li>パブリックサブネット</li>
                    </ul>
                  </li>
                  <li><strong>インターネットゲートウェイ</strong></li>
                  <li><strong>ルートテーブル</strong></li>
                  <li><strong>セキュリティグループ</strong></li>
                </ul>
              </li>
            </ul>

            <!-- 全体像 スライドショー -->
            <div class="inline-slideshow" id="handson-architecture-slideshow">
              <div class="inline-slideshow-header">
                <h3 class="inline-slideshow-title">&#128196; 構成図</h3>
              </div>
              <div class="inline-slideshow-body">
                <div class="inline-slide-area">
                  <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="handson-architecture" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                  <div class="inline-slide-image-wrapper">
                    <img class="inline-slide-image" id="handson-architecture-slide-img" src="images/03/handson/architecture01.png" alt="構成図 1 / 1">
                  </div>
                  <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="handson-architecture" data-dir="next" aria-label="次のスライド">&#10095;</button>
                </div>
                <div class="inline-slide-counter-area">
                  <span class="inline-slide-counter" id="handson-architecture-counter">1 / 1</span>
                </div>
                <div class="inline-slide-indicators" id="handson-architecture-indicators"></div>
              </div>
            </div>

            <script>
              initInlineSlideshow('handson-architecture', {
                folder: 'images/03/handson',
                prefix: 'architecture',
                pageCount: 1,
                imgId: 'handson-architecture-slide-img',
                counterId: 'handson-architecture-counter',
                indicatorsId: 'handson-architecture-indicators'
              });
            </script>
          </div>

          <h3 class="section-subtitle">VPCの作成</h3>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">VPCサービスを開く</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">コンソールの上部の検索窓に「VPC」と入力し、サービス一覧から「VPC」を選択してダッシュボードを開きます。</p>
              
              <!-- VPC作成手順1 スライドショー -->
              <div class="inline-slideshow" id="create-vpc1-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-vpc1" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-vpc1-slide-img" src="images/02/handson/create-vpc101.png" alt="VPCサービスを開く 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-vpc1" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-vpc1-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-vpc1-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-vpc1', {
                  folder: 'images/03/handson',
                  prefix: 'create-vpc1',
                  pageCount: 2,
                  imgId: 'create-vpc1-slide-img',
                  counterId: 'create-vpc1-counter',
                  indicatorsId: 'create-vpc1-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">リージョンの選択</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">右上のリージョン選択メニューから、適切なリージョン（例: 東京リージョン）が選択されていることを確認します。</p>
              
              <!-- VPC作成手順2 スライドショー -->
              <div class="inline-slideshow" id="create-vpc2-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-vpc2" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-vpc2-slide-img" src="images/03/handson/create-vpc201.png" alt="リージョンの選択 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-vpc2" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-vpc2-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-vpc2-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-vpc2', {
                  folder: 'images/03/handson',
                  prefix: 'create-vpc2',
                  pageCount: 1,
                  imgId: 'create-vpc2-slide-img',
                  counterId: 'create-vpc2-counter',
                  indicatorsId: 'create-vpc2-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">VPCの作成開始</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">「お使いのVPC」から「VPCを作成」をクリックします。</p>

              <!-- VPC作成手順3 スライドショー -->
              <div class="inline-slideshow" id="create-vpc3-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-vpc3" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-vpc3-slide-img" src="images/03/handson/create-vpc301.png" alt="VPCの作成開始 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-vpc3" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-vpc3-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-vpc3-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-vpc3', {
                  folder: 'images/03/handson',
                  prefix: 'create-vpc3',
                  pageCount: 1,
                  imgId: 'create-vpc3-slide-img',
                  counterId: 'create-vpc3-counter',
                  indicatorsId: 'create-vpc3-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">VPCの設定</span>
            </div>
            <div class="step-content">
              <ul class="feature-list">
                <li><strong>作成するリソース:</strong> 「VPCのみ」</li>
                <div class="info-box" style="margin-top: 15px;">
                  <div class="info-box-title">&#128161; 「VPCなど」を選択した場合</div>
                  <p>
                    「VPCなど」を選択すると、サブネットやインターネットゲートウェイなどを一括で自動作成してくれます。
                    とても便利ですが、<strong>今回は学習のため、それぞれの役割を理解しながら一つずつ作成</strong>していきます。
                  </p>
              </div>
                <li><strong>名前タグ:</strong> 例 <code>my-vpc-xx</code>（xxは同一アカウントの他のユーザと被らないように）</li>
                <li><strong>IPv4 CIDR ブロック:</strong> 例 <code>10.xx.0.0/16</code></li>
              </ul>
              <p class="text-paragraph" style="margin-top: 15px;">設定後、「VPC を作成」をクリックします。</p>
              
              <!-- VPC作成手順4 スライドショー -->
              <div class="inline-slideshow" id="create-vpc4-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-vpc4" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-vpc4-slide-img" src="images/03/handson/create-vpc401.png" alt="VPCの設定 1 / 3">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-vpc4" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-vpc4-counter">1 / 3</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-vpc4-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-vpc4', {
                  folder: 'images/03/handson',
                  prefix: 'create-vpc4',
                  pageCount: 3,
                  imgId: 'create-vpc4-slide-img',
                  counterId: 'create-vpc4-counter',
                  indicatorsId: 'create-vpc4-indicators'
                });
              </script>
            </div>
          </div>

          <h3 class="section-subtitle">サブネットの作成</h3>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">サブネット作成画面を開く</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">左メニューの「サブネット」から「サブネットを作成」をクリックします。</p>

              <!-- サブネット作成手順1 スライドショー -->
              <div class="inline-slideshow" id="create-subnet1-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-subnet1" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-subnet1-slide-img" src="images/03/handson/create-subnet101.png" alt="サブネット作成画面を開く 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-subnet1" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-subnet1-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-subnet1-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-subnet1', {
                  folder: 'images/03/handson',
                  prefix: 'create-subnet1',
                  pageCount: 1,
                  imgId: 'create-subnet1-slide-img',
                  counterId: 'create-subnet1-counter',
                  indicatorsId: 'create-subnet1-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">VPCの選択</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">先程作成したVPCを選択します。</p>

              <!-- サブネット作成手順2 スライドショー -->
              <div class="inline-slideshow" id="create-subnet2-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-subnet2" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-subnet2-slide-img" src="images/03/handson/create-subnet201.png" alt="VPCの選択 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-subnet2" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-subnet2-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-subnet2-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-subnet2', {
                  folder: 'images/03/handson',
                  prefix: 'create-subnet2',
                  pageCount: 1,
                  imgId: 'create-subnet2-slide-img',
                  counterId: 'create-subnet2-counter',
                  indicatorsId: 'create-subnet2-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">パブリックサブネットの設定</span>
            </div>
            <div class="step-content">
              <ul class="feature-list">
                <li><strong>サブネット名:</strong> <code>public-subnet-1a-xx</code></li>
                <li><strong>アベイラビリティゾーン:</strong> <code>ap-northeast-1a</code></li>
                <li><strong>IPv4 VPC CIDR ブロック:</strong> <code>10.xx.0.0/16</code></li>
                <li><strong>IPv4 サブネット CIDR ブロック:</strong> <code>10.xx.1.0/24</code></li>
              </ul>

              <!-- サブネット作成手順3 スライドショー -->
              <div class="inline-slideshow" id="create-subnet3-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-subnet3" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-subnet3-slide-img" src="images/03/handson/create-subnet301.png" alt="パブリックサブネットの設定 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-subnet3" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-subnet3-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-subnet3-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-subnet3', {
                  folder: 'images/03/handson',
                  prefix: 'create-subnet3',
                  pageCount: 1,
                  imgId: 'create-subnet3-slide-img',
                  counterId: 'create-subnet3-counter',
                  indicatorsId: 'create-subnet3-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">プライベートサブネットの追加</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">「新しいサブネットを追加」を押して、以下を設定します。</p>
              <ul class="feature-list">
                <li><strong>サブネット名:</strong> <code>private-subnet-1a-xx</code></li>
                <li><strong>アベイラビリティゾーン:</strong> <code>ap-northeast-1a</code></li>
                <li><strong>IPv4 VPC CIDR ブロック:</strong> <code>10.xx.0.0/16</code></li>
                <li><strong>IPv4 サブネット CIDR ブロック:</strong> <code>10.xx.2.0/24</code></li>
              </ul>

              <!-- サブネット作成手順4 スライドショー -->
              <div class="inline-slideshow" id="create-subnet4-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-subnet4" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-subnet4-slide-img" src="images/03/handson/create-subnet401.png" alt="プライベートサブネットの追加 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-subnet4" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-subnet4-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-subnet4-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-subnet4', {
                  folder: 'images/03/handson',
                  prefix: 'create-subnet4',
                  pageCount: 2,
                  imgId: 'create-subnet4-slide-img',
                  counterId: 'create-subnet4-counter',
                  indicatorsId: 'create-subnet4-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">5</span>
              <span class="step-title">サブネットを作成</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">「サブネット作成」をクリックし、サブネットを作成します。</p>

              <!-- サブネット作成手順5 スライドショー -->
              <div class="inline-slideshow" id="create-subnet5-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-subnet5" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-subnet5-slide-img" src="images/03/handson/create-subnet501.png" alt="サブネットを作成 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-subnet5" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-subnet5-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-subnet5-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-subnet5', {
                  folder: 'images/03/handson',
                  prefix: 'create-subnet5',
                  pageCount: 2,
                  imgId: 'create-subnet5-slide-img',
                  counterId: 'create-subnet5-counter',
                  indicatorsId: 'create-subnet5-indicators'
                });
              </script>
            </div>
          </div>

          <h3 class="section-subtitle">インターネットゲートウェイの作成</h3>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">インターネットゲートウェイ作成画面を開く</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">左メニューの「インターネットゲートウェイ」→「インターネットゲートウェイの作成」をクリックします。</p>

              <!-- インターネットゲートウェイ作成手順1 スライドショー -->
              <div class="inline-slideshow" id="create-igw1-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-igw1" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-igw1-slide-img" src="images/03/handson/create-igw101.png" alt="インターネットゲートウェイの作成 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-igw1" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-igw1-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-igw1-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-igw1', {
                  folder: 'images/03/handson',
                  prefix: 'create-igw1',
                  pageCount: 1,
                  imgId: 'create-igw1-slide-img',
                  counterId: 'create-igw1-counter',
                  indicatorsId: 'create-igw1-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">インターネットゲートウェイ作成</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">名前（例: <code>my-igw-xx</code>）を入力して、「インターネットゲートウェイの作成」をクリックして作成します。</p>

              <!-- インターネットゲートウェイ作成手順2 スライドショー -->
              <div class="inline-slideshow" id="create-igw2-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-igw2" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-igw2-slide-img" src="images/03/handson/create-igw201.png" alt="インターネットゲートウェイの作成 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-igw2" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-igw2-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-igw2-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-igw2', {
                  folder: 'images/03/handson',
                  prefix: 'create-igw2',
                  pageCount: 2,
                  imgId: 'create-igw2-slide-img',
                  counterId: 'create-igw2-counter',
                  indicatorsId: 'create-igw2-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">VPCアタッチ画面を開く</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">作成後、アクションから 「VPC にアタッチ」 を選択し、アタッチ画面を開きます。</p>

              <!-- インターネットゲートウェイ作成手順3 スライドショー -->
              <div class="inline-slideshow" id="create-igw3-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-igw3" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-igw3-slide-img" src="images/03/handson/create-igw301.png" alt="インターネットゲートウェイの作成 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-igw3" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-igw3-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-igw3-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-igw3', {
                  folder: 'images/03/handson',
                  prefix: 'create-igw3',
                  pageCount: 1,
                  imgId: 'create-igw3-slide-img',
                  counterId: 'create-igw3-counter',
                  indicatorsId: 'create-igw3-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">VPCにアタッチ</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">自身のVPCを選択し、「インターネットゲートウェイのアタッチ」をクリックして紐付けます。</p>

              <!-- インターネットゲートウェイ作成手順4 スライドショー -->
              <div class="inline-slideshow" id="create-igw4-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-igw4" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-igw4-slide-img" src="images/03/handson/create-igw401.png" alt="インターネットゲートウェイの作成 1 / 3">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-igw4" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-igw4-counter">1 / 3</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-igw4-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-igw4', {
                  folder: 'images/03/handson',
                  prefix: 'create-igw4',
                  pageCount: 3,
                  imgId: 'create-igw4-slide-img',
                  counterId: 'create-igw4-counter',
                  indicatorsId: 'create-igw4-indicators'
                });
              </script>
            </div>
          </div>

          <h3 class="section-subtitle">ルートテーブルの設定</h3>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">ルートテーブル作成画面を開く</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">左メニューの「ルートテーブル」→「ルートテーブルを作成」をクリックします。</p>

              <!-- ルートテーブル作成手順1 スライドショー -->
              <div class="inline-slideshow" id="create-rt1-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-rt1" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-rt1-slide-img" src="images/03/handson/create-rt101.png" alt="ルートテーブルの作成 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-rt1" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-rt1-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-rt1-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-rt1', {
                  folder: 'images/03/handson',
                  prefix: 'create-rt1',
                  pageCount: 1,
                  imgId: 'create-rt1-slide-img',
                  counterId: 'create-rt1-counter',
                  indicatorsId: 'create-rt1-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">パブリック用ルートテーブル</span>
            </div>
            <div class="step-content">
              <ul class="feature-list">
                <li><strong>名前:</strong> <code>public-rt-xx</code></li>
                <li><strong>VPC:</strong> 自分のVPCを選択して作成します。</li>
              </ul>
              <p class="text-paragraph" style="margin-top: 15px;">設定後、「ルートテーブルを作成」をクリックします。</p>

              <!-- ルートテーブル作成手順2 スライドショー -->
              <div class="inline-slideshow" id="create-rt2-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-rt2" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-rt2-slide-img" src="images/03/handson/create-rt201.png" alt="ルートテーブルの作成 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-rt2" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-rt2-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-rt2-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-rt2', {
                  folder: 'images/03/handson',
                  prefix: 'create-rt2',
                  pageCount: 2,
                  imgId: 'create-rt2-slide-img',
                  counterId: 'create-rt2-counter',
                  indicatorsId: 'create-rt2-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">ルート編集画面を開く</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">作成した <code>public-rt-xx</code> の画面にて、「ルート」タブ → 「ルートを編集」をクリックします。</p>

              <!-- ルートテーブル作成手順3 スライドショー -->
              <div class="inline-slideshow" id="create-rt3-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-rt3" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-rt3-slide-img" src="images/03/handson/create-rt301.png" alt="ルートテーブルの作成 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-rt3" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-rt3-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-rt3-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-rt3', {
                  folder: 'images/03/handson',
                  prefix: 'create-rt3',
                  pageCount: 1,
                  imgId: 'create-rt3-slide-img',
                  counterId: 'create-rt3-counter',
                  indicatorsId: 'create-rt3-indicators'
                });
              </script>
            </div>
          </div>

          
          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">ルートの編集</span>
            </div>
            <div class="step-content">
              <ul class="feature-list">
                <li>「ルートを追加」をクリック</li>
                <li><strong>送信先:</strong> <code>0.0.0.0/0</code></li>
                <li><strong>ターゲット:</strong> Internet Gateway (作成した <code>my-igw-xx</code> を選択)</li>
              </ul>
              <p class="text-paragraph" style="margin-top: 15px;">設定後、「変更の保存」をクリックします。</p>

              <!-- ルートテーブル作成手順4 スライドショー -->
              <div class="inline-slideshow" id="create-rt4-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-rt4" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-rt4-slide-img" src="images/03/handson/create-rt401.png" alt="ルートテーブルの作成 1 / 3">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-rt4" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-rt4-counter">1 / 3</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-rt4-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-rt4', {
                  folder: 'images/03/handson',
                  prefix: 'create-rt4',
                  pageCount: 3,
                  imgId: 'create-rt4-slide-img',
                  counterId: 'create-rt4-counter',
                  indicatorsId: 'create-rt4-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">5</span>
              <span class="step-title">サブネットの関連付け</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">「サブネットの関連付け」タブ → 「サブネットの関連付けを編集」をクリックし、<code>public-subnet-1a</code> を選択して保存します。</p>

              <!-- ルートテーブル作成手順5 スライドショー -->
              <div class="inline-slideshow" id="create-rt5-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-rt5" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-rt5-slide-img" src="images/03/handson/create-rt501.png" alt="ルートテーブルの作成 1 / 3">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-rt5" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-rt5-counter">1 / 3</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-rt5-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-rt5', {
                  folder: 'images/03/handson',
                  prefix: 'create-rt5',
                  pageCount: 3,
                  imgId: 'create-rt5-slide-img',
                  counterId: 'create-rt5-counter',
                  indicatorsId: 'create-rt5-indicators'
                });
              </script>
            </div>
          </div>

          <h3 class="section-subtitle">セキュリティグループの作成手順</h3>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">セキュリティグループ作成画面を開く</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">左メニューの「セキュリティグループ」→「セキュリティグループを作成」をクリックします。</p>

              <!-- セキュリティグループ作成手順1 スライドショー -->
              <div class="inline-slideshow" id="create-sg1-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-sg1" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-sg1-slide-img" src="images/03/handson/create-sg101.png" alt="セキュリティグループの作成 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-sg1" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-sg1-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-sg1-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-sg1', {
                  folder: 'images/03/handson',
                  prefix: 'create-sg1',
                  pageCount: 1,
                  imgId: 'create-sg1-slide-img',
                  counterId: 'create-sg1-counter',
                  indicatorsId: 'create-sg1-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">基本詳細の設定</span>
            </div>
            <div class="step-content">
              <ul class="feature-list">
                <li><strong>セキュリティグループ名:</strong> <code>SgWebXX</code></li>
                <li><strong>説明:</strong> <code>For Web Server</code> など、用途を簡潔に記述します。</li>
                <li><strong>VPC:</strong> 自分が作成したVPC（例: <code>my-vpc-xx</code>）を選択してください。</li>
              </ul>

              <!-- セキュリティグループ作成手順2 スライドショー -->
              <div class="inline-slideshow" id="create-sg2-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-sg2" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-sg2-slide-img" src="images/03/handson/create-sg201.png" alt="セキュリティグループの作成 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-sg2" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-sg2-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-sg2-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-sg2', {
                  folder: 'images/03/handson',
                  prefix: 'create-sg2',
                  pageCount: 1,
                  imgId: 'create-sg2-slide-img',
                  counterId: 'create-sg2-counter',
                  indicatorsId: 'create-sg2-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">インバウンドルールの設定</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">「ルールを追加」をルールの追加欄分（3回）クリックして、以下のルールを追加します。</p>
              <table class="info-table">
                <thead>
                  <tr>
                    <th>タイプ</th>
                    <th>プロトコル</th>
                    <th>ポート範囲</th>
                    <th>ソース（送信元）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SSH</td>
                    <td>TCP</td>
                    <td>22</td>
                    <td>マイ IP</td>
                  </tr>
                  <tr>
                    <td>HTTP</td>
                    <td>TCP</td>
                    <td>80</td>
                    <td>Anywhere-IPv4(0.0.0.0/0)</td>
                  </tr>
                  <tr>
                    <td>すべての ICMP - IPv4</td>
                    <td>ICMP</td>
                    <td>すべて</td>
                    <td>Anywhere-IPv4(0.0.0.0/0)</td>
                  </tr>
                </tbody>
              </table>

              <!-- セキュリティグループ作成手順3 スライドショー -->
              <div class="inline-slideshow" id="create-sg3-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-sg3" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-sg3-slide-img" src="images/03/handson/create-sg301.png" alt="セキュリティグループの作成 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-sg3" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-sg3-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-sg3-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-sg3', {
                  folder: 'images/03/handson',
                  prefix: 'create-sg3',
                  pageCount: 2,
                  imgId: 'create-sg3-slide-img',
                  counterId: 'create-sg3-counter',
                  indicatorsId: 'create-sg3-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">アウトバウンドルールの設定</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">アウトバウンドルールは、デフォルトで「すべてのトラフィック / 0.0.0.0/0（すべて許可）」が設定されています。このままでOKです。</p>

              <!-- セキュリティグループ作成手順4 スライドショー -->
              <div class="inline-slideshow" id="create-sg4-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-sg4" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-sg4-slide-img" src="images/03/handson/create-sg401.png" alt="セキュリティグループの作成 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-sg4" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-sg4-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-sg4-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-sg4', {
                  folder: 'images/03/handson',
                  prefix: 'create-sg4',
                  pageCount: 1,
                  imgId: 'create-sg4-slide-img',
                  counterId: 'create-sg4-counter',
                  indicatorsId: 'create-sg4-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">5</span>
              <span class="step-title">セキュリティグループの作成</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">「セキュリティグループの作成」をクリックします。</p>

              <!-- セキュリティグループ作成手順5 スライドショー -->
              <div class="inline-slideshow" id="create-sg5-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-sg5" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-sg5-slide-img" src="images/03/handson/create-sg501.png" alt="セキュリティグループの作成 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-sg5" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-sg5-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-sg5-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-sg5', {
                  folder: 'images/03/handson',
                  prefix: 'create-sg5',
                  pageCount: 2,
                  imgId: 'create-sg5-slide-img',
                  counterId: 'create-sg5-counter',
                  indicatorsId: 'create-sg5-indicators'
                });
              </script>
            </div>
          </div>

        </div>
      `
    },
    // セクション: 理解度テスト
    {
      id: "3-quiz",
      title: "第3章 理解度テスト",
      type: "quiz",
      questions: [
        {
          question: "VPC（Virtual Private Cloud）の説明として最も適切なものはどれですか？",
          options: [
            { label: "A", text: "AWS上に作る自分専用の仮想ネットワーク空間" },
            { label: "B", text: "AWSが提供する物理的なデータセンター" },
            { label: "C", text: "インターネット上の公開サーバー" },
            { label: "D", text: "AWSのセキュリティ認証サービス" }
          ],
          correct: 0,
          explanation: {
            correct: "正解です！VPCはAWS上に作る自分専用の仮想ネットワーク空間です。他のユーザーから論理的に分離されており、IPアドレス範囲やセキュリティを自由に設定できます。",
            incorrect: "不正解です。VPCはAWS上に作る自分専用の仮想ネットワーク空間です。オフィスビルに例えると、VPC全体が自分専用の建物のようなものです。"
          }
        },
        {
          question: "パブリックサブネットとプライベートサブネットの違いとして正しいものはどれですか？",
          options: [
            { label: "A", text: "パブリックサブネットは無料、プライベートサブネットは有料" },
            { label: "B", text: "パブリックサブネットは東京リージョン専用、プライベートサブネットは大阪リージョン専用" },
            { label: "C", text: "パブリックサブネットはインターネットに直接アクセス可能、プライベートサブネットは直接アクセス不可" },
            { label: "D", text: "パブリックサブネットは開発用、プライベートサブネットは本番用" }
          ],
          correct: 2,
          explanation: {
            correct: "正解です！パブリックサブネットはインターネットに直接アクセス可能で、Webサーバーなどを配置します。プライベートサブネットはインターネットから直接アクセスできず、データベースなど外部に公開したくないリソースを配置します。",
            incorrect: "不正解です。パブリックサブネットはインターネットに直接アクセス可能で、プライベートサブネットはインターネットから直接アクセスできません。これはセキュリティ設計上の重要な違いです。"
          }
        },
        {
          question: "インターネットゲートウェイ（IGW）の役割として正しいものはどれですか？",
          options: [
            { label: "A", text: "VPC内のリソース間の通信を暗号化する" },
            { label: "B", text: "VPCとインターネットを接続するための出入口" },
            { label: "C", text: "VPC内のIPアドレスを自動的に割り当てる" },
            { label: "D", text: "VPCのバックアップを作成する" }
          ],
          correct: 1,
          explanation: {
            correct: "正解です！インターネットゲートウェイはVPCとインターネットを接続するための出入口です。パブリックサブネットのリソースがインターネットと通信するために必要です。",
            incorrect: "不正解です。インターネットゲートウェイはVPCとインターネットを接続するための出入口です。パブリックサブネットからインターネットにアクセスするために必要なコンポーネントです。"
          }
        },
        {
          question: "NATゲートウェイが必要な場面はどれですか？",
          options: [
            { label: "A", text: "パブリックサブネットからインターネットにアクセスする場合" },
            { label: "B", text: "EC2インスタンスを起動する場合" },
            { label: "C", text: "VPC間でデータを転送する場合" },
            { label: "D", text: "プライベートサブネット内のサーバーがソフトウェアのアップデートなどで外部にアクセスする場合" }
          ],
          correct: 3,
          explanation: {
            correct: "正解です！NATゲートウェイは、プライベートサブネット内のサーバーがソフトウェアのアップデートなどで外部にアクセスする必要がある場合に使用します。外部からの直接アクセスは許可せず、内部から外部への通信のみ許可します。",
            incorrect: "不正解です。NATゲートウェイはプライベートサブネットのリソースが外部へ接続するための仕組みです。例えば、プライベートサブネット内のサーバーがソフトウェアのアップデートで外部にアクセスする必要がある場合に使用します。"
          }
        },
        {
          question: "セキュリティグループの説明として正しいものはどれですか？",
          options: [
            { label: "A", text: "EC2インスタンスなどのリソースに対する仮想ファイアウォール" },
            { label: "B", text: "IAMユーザーをまとめて管理するもの" },
            { label: "C", text: "VPCのIPアドレス範囲を定義するもの" },
            { label: "D", text: "AWSアカウントのパスワードポリシー" }
          ],
          correct: 0,
          explanation: {
            correct: "正解です！セキュリティグループはEC2インスタンスなどのリソースに対する仮想ファイアウォールです。インバウンド（受信）とアウトバウンド（送信）のルールを設定して、通信を許可/拒否できます。",
            incorrect: "不正解です。セキュリティグループはEC2インスタンスなどのリソースに対する仮想ファイアウォールです。どのポートからの通信を許可するかなど、細かいルールを設定できます。"
          }
        }
      ]
    }
  ]
};
