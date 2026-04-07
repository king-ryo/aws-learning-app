// ========================================
// 第4章: 仮想サーバー構築（EC2）【短縮版】
// ========================================
const chapter04 = {
  id: 4,
  title: "仮想サーバー構築（EC2）",
  sections: [
    // セクション1: この章で学ぶこと
    {
      id: "4-intro",
      title: "この章で学ぶこと",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <div class="chapter-intro-banner">
            <div class="chapter-number">CHAPTER 04</div>
            <h1 class="chapter-main-title">仮想サーバー構築（EC2）</h1>
            <p class="chapter-subtitle">クラウド上でサーバーを起動・管理しよう</p>
          </div>

          <div class="learning-goals">
            <h3 class="learning-goals-title">&#127919; この章の学習目標</h3>
            <ul class="learning-goals-list">
              <li>EC2とは何かを理解する</li>
              <li>インスタンスタイプの選び方を説明できる</li>
              <li>AMI（マシンイメージ）の役割を理解する</li>
              <li>EBS（ストレージ）の基本を理解する</li>
              <li>キーペアとセキュリティグループの役割を知る</li>
            </ul>
          </div>

          <h2 class="section-title">&#128218; はじめに</h2>

          <p class="text-paragraph">
            前章でVPC（ネットワーク基盤）を学びました。この章では、そのVPC上で動作する
            <strong><span class="aws-keyword" data-service="EC2">EC2</span>（Elastic Compute Cloud）</strong>を学びます。
            EC2は、AWSの中でも最も基本的で重要なサービスの一つです。
          </p>

          <div class="info-box">
            <div class="info-box-title">&#128279; 前章との連携</div>
            <p>
              <strong>3章で構築したVPCの上に、いよいよサーバーを構築します。</strong><br>
              VPCは「オフィスビル」、サブネットは「各フロア」でしたね。
              この章では、そのフロアに実際の「部屋（サーバー）」を作ります。
            </p>
          </div>

          <h3 class="section-subtitle">この章の構成</h3>
          <ul class="feature-list">
            <li><strong>4.1 EC2とは</strong> - EC2の基本概念を学びます</li>
            <li><strong>4.2 インスタンスタイプ</strong> - サーバーのスペックを選ぶ方法を理解します</li>
            <li><strong>4.3 AMI</strong> - サーバーのテンプレートについて学びます</li>
            <li><strong>4.4 EBS</strong> - サーバーのストレージを理解します</li>
            <li><strong>4.5 キーペアとセキュリティ</strong> - 安全な接続方法を学びます</li>
          </ul>
        </div>
      `
    },
    // セクション2: EC2とは
    {
      id: "4-1",
      title: "EC2とは",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128187; 4.1 EC2とは</h2>

          <p class="text-paragraph">
            <span class="highlight">EC2（Elastic Compute Cloud）</span>は、
            AWS上で<strong>仮想サーバー（インスタンス）</strong>を起動・管理できるサービスです。
          </p>

          <div class="term-box">
            <div class="term-box-title">&#128218; インスタンスとは？</div>
            <p>
              EC2で起動する仮想サーバーのことを<strong>インスタンス</strong>と呼びます。
              「Elastic（伸縮自在）」という名前の通り、必要に応じてインスタンスを
              <strong>増やしたり減らしたり</strong>できます。
            </p>
          </div>

          <h3 class="section-subtitle">EC2の特徴</h3>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#9889;</span>数分で起動</h4>
            <p class="text-paragraph">
              従来、物理サーバーの調達には数週間〜数ヶ月かかりましたが、
              EC2なら<strong>数分でサーバーを起動</strong>できます。
            </p>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128200;</span>スケーラブル &amp; 従量課金</h4>
            <p class="text-paragraph">
              アクセス増加時にインスタンスを追加し、落ち着いたら減らせます。
              料金は<strong>秒単位（最低60秒）</strong>の従量課金で、無駄なコストを抑えられます。
            </p>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#127760;</span>多様なOS</h4>
            <p class="text-paragraph">
              Linux（Amazon Linux, Ubuntu, Red Hat等）やWindowsなど、
              <strong>様々なOS</strong>を選択できます。
            </p>
          </div>

          <h3 class="section-subtitle">EC2の配置場所</h3>

          <p class="text-paragraph">
            EC2インスタンスは、前章で学んだ<span class="aws-keyword" data-service="VPC">VPC</span>の
            <span class="aws-keyword" data-service="サブネット">サブネット</span>内に配置されます。
          </p>

          <div class="point-box">
            <div class="point-box-title">&#128161; 用途に応じた配置</div>
            <ul class="feature-list">
              <li><strong>パブリックサブネット</strong>：Webサーバーなど、外部からアクセスが必要なEC2</li>
              <li><strong>プライベートサブネット</strong>：アプリケーションサーバーなど、内部処理用のEC2</li>
            </ul>
          </div>
        </div>
      `
    },
    // セクション3: インスタンスタイプ
    {
      id: "4-2",
      title: "インスタンスタイプ",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128295; 4.2 インスタンスタイプ</h2>

          <p class="text-paragraph">
            EC2インスタンスを起動する際、<span class="highlight">インスタンスタイプ</span>を選択します。
            これは、サーバーの<strong>CPU、メモリ、ネットワーク性能</strong>などのスペックを決めるものです。
          </p>

          <div class="term-box">
            <div class="term-box-title">&#128218; インスタンスタイプの読み方</div>
            <p>
              インスタンスタイプは「<strong>t3.micro</strong>」のような形式で表されます。
            </p>
            <div class="code-block" style="margin-top: 12px;">
t3.micro
│  │
│  └── サイズ（micro, small, medium, large, xlarge...）
└───── ファミリー（t3 = 汎用バースト型）</div>
          </div>

          <h3 class="section-subtitle">主なインスタンスファミリー</h3>

          <table class="info-table">
            <thead>
              <tr>
                <th>ファミリー</th>
                <th>特徴</th>
                <th>用途例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>T系</strong><br>(t3, t3a, t4g)</td>
                <td>汎用バースト型<br>コスト効率が良い</td>
                <td>開発環境、小規模Webサーバー</td>
              </tr>
              <tr>
                <td><strong>M系</strong><br>(m5, m6i, m7i)</td>
                <td>汎用<br>バランスの取れた性能</td>
                <td>Webアプリ、中規模システム</td>
              </tr>
              <tr>
                <td><strong>C系</strong><br>(c5, c6i, c7i)</td>
                <td>コンピューティング最適化<br>高いCPU性能</td>
                <td>バッチ処理、科学計算</td>
              </tr>
              <tr>
                <td><strong>R系</strong><br>(r5, r6i, r7i)</td>
                <td>メモリ最適化<br>大容量メモリ</td>
                <td>データベース、キャッシュサーバー</td>
              </tr>
              <tr>
                <td><strong>G/P系</strong><br>(g5, g6, p5)</td>
                <td>GPU搭載<br>高い描画・計算性能</td>
                <td>機械学習、グラフィック処理</td>
              </tr>
            </tbody>
          </table>

          <div class="info-box">
            <div class="info-box-title">&#128161; 無料利用枠</div>
            <p>
              新規アカウントでは、対象のインスタンスタイプが無料利用枠で利用できます。
              学習目的であれば、まずは無料枠内で始めましょう。
              対象インスタンスや条件の詳細は<a href="https://aws.amazon.com/free/" target="_blank" rel="noopener">AWS無料利用枠ページ</a>をご確認ください。
            </p>
          </div>

          <h3 class="section-subtitle">バーストとクレジット（T系の特徴）</h3>

          <div class="term-box">
            <div class="term-box-title">&#128218; バースト機能とは？</div>
            <p>
              T系インスタンスには<strong>バースト機能</strong>があります。
              普段は低いCPU使用率で「クレジット」を貯め、負荷が高い時にクレジットを消費して
              一時的に高い性能を発揮できます。
              <strong>普段は負荷が低く、時々アクセスが集中する</strong>ワークロードに最適です。
            </p>
          </div>

          <div class="warning-box">
            <div class="warning-box-title">&#9888; クレジット枯渇に注意</div>
            <p>
              T2インスタンスではクレジットが枯渇するとCPU性能が制限されます。
              T3/T4gはデフォルトで<strong>Unlimitedモード</strong>のため制限されませんが、超過分に追加料金が発生します。
              常に高い負荷がかかる用途には、M系やC系を検討してください。
            </p>
          </div>

          <div class="point-box">
            <div class="point-box-title">&#128161; インスタンスタイプの選び方</div>
            <ul class="feature-list">
              <li><strong>学習・開発</strong>：t3.micro / t3.small</li>
              <li><strong>小〜中規模Webサーバー</strong>：t3.medium / m5.large</li>
              <li><strong>高負荷処理</strong>：c5.xlarge 以上</li>
              <li><strong>大容量メモリ必要</strong>：r5.large 以上</li>
            </ul>
            <p style="margin-top: 12px;">
              迷ったら小さいサイズから始めて、必要に応じて<strong>スケールアップ</strong>しましょう。
            </p>
          </div>
        </div>
      `
    },
    // セクション4: AMI
    {
      id: "4-3",
      title: "AMI（マシンイメージ）",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128190; 4.3 AMI（マシンイメージ）</h2>

          <p class="text-paragraph">
            EC2インスタンスを起動する際、<span class="highlight">AMI（Amazon Machine Image）</span>を選択します。
            AMIは、サーバーの<strong>テンプレート</strong>のようなものです。
          </p>

          <div class="term-box">
            <div class="term-box-title">&#128218; AMIとは？</div>
            <p>
              <strong>AMI（Amazon Machine Image）</strong>には、以下の情報が含まれています：
            </p>
            <ul class="feature-list" style="margin-top: 12px;">
              <li>OS（Linux, Windows等）</li>
              <li>アプリケーションやミドルウェア</li>
              <li>設定ファイル</li>
              <li>ストレージの構成</li>
            </ul>
            <p style="margin-top: 12px;">
              AMIを選ぶだけで、<strong>OSや必要なソフトウェアが入った状態</strong>でサーバーを起動できます。
            </p>
          </div>

          <h3 class="section-subtitle">AMIの種類</h3>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#127775;</span>Amazon提供AMI</h4>
            <p class="text-paragraph">
              AWSが提供する公式AMIです。定期的に更新され、セキュリティパッチも適用済みです。
              代表例：Amazon Linux 2023、Ubuntu Server、Windows Serverなど。
            </p>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128722;</span>AWS Marketplace AMI</h4>
            <p class="text-paragraph">
              サードパーティが提供するAMIです。WordPressやセキュリティツールなど、
              <strong>特定のソフトウェアが事前にインストール</strong>された状態で利用できます。
              ソフトウェアライセンス料が別途かかる場合があります。
            </p>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128736;</span>カスタムAMI</h4>
            <p class="text-paragraph">
              自分で作成したAMIです。既存のインスタンスをカスタマイズして
              <strong>自分専用のテンプレート</strong>として保存し、同じ構成のサーバーを何度でも簡単に起動できます。
            </p>
          </div>

          <div class="point-box">
            <div class="point-box-title">&#127775; Amazon Linux 2023の利点</div>
            <ul class="feature-list">
              <li>AWS環境に最適化されたLinuxディストリビューション</li>
              <li>AWS CLIやAWSツールがプリインストール</li>
              <li>長期サポート（標準サポートとメンテナンスサポートの2段階。詳細は<a href="https://docs.aws.amazon.com/linux/al2023/ug/release-cadence.html" target="_blank" rel="noopener">公式ドキュメント</a>を参照）</li>
              <li>追加ライセンス料なし（無料）</li>
            </ul>
          </div>

          <!-- AMI スライドショー -->
          <div class="inline-slideshow" id="ami-slideshow">
            <div class="inline-slideshow-header">
              <h3 class="inline-slideshow-title">&#128196; AMI（マシンイメージ） 図解</h3>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="ami" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img class="inline-slide-image" id="ami-slide-img" src="images/04/ami01.png" alt="AMI 1 / 10">
                </div>
                <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="ami" data-dir="next" aria-label="次のスライド">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span class="inline-slide-counter" id="ami-counter">1 / 10</span>
              </div>
              <div class="inline-slide-indicators" id="ami-indicators"></div>
            </div>
          </div>

          <script>
            initInlineSlideshow('ami', {
              folder: 'images/04',
              prefix: 'ami',
              pageCount: 10,
              imgId: 'ami-slide-img',
              counterId: 'ami-counter',
              indicatorsId: 'ami-indicators'
            });
          </script>
        </div>
      `
    },
    // セクション5: EBS
    {
      id: "4-4",
      title: "EBS（ストレージ）",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128451; 4.4 EBS（ストレージ）</h2>

          <p class="text-paragraph">
            EC2インスタンスにデータを保存するには、<span class="aws-keyword" data-service="EBS">EBS</span>（Elastic Block Store）を使用します。
            EBSは、EC2用の<strong>永続的なブロックストレージ</strong>です。
          </p>

          <div class="term-box">
            <div class="term-box-title">&#128218; EBSとは？</div>
            <p>
              EBSは、EC2インスタンスに接続する<strong>仮想ハードディスク</strong>のようなものです。
            </p>
            <ul class="feature-list" style="margin-top: 12px;">
              <li>インスタンスを停止してもデータが保持される</li>
              <li>サイズを後から変更できる</li>
              <li>スナップショット（バックアップ）を作成できる</li>
              <li>暗号化をサポート</li>
            </ul>
          </div>

          <!-- EBS スライドショー -->
          <div class="inline-slideshow" id="ebs-slideshow">
            <div class="inline-slideshow-header">
              <h3 class="inline-slideshow-title">&#128196; EBS（ストレージ） 図解</h3>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="ebs" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img class="inline-slide-image" id="ebs-slide-img" src="images/04/ebs01.png" alt="EBS 1 / 7">
                </div>
                <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="ebs" data-dir="next" aria-label="次のスライド">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span class="inline-slide-counter" id="ebs-counter">1 / 7</span>
              </div>
              <div class="inline-slide-indicators" id="ebs-indicators"></div>
            </div>
          </div>

          <script>
            initInlineSlideshow('ebs', {
              folder: 'images/04',
              prefix: 'ebs',
              pageCount: 7,
              imgId: 'ebs-slide-img',
              counterId: 'ebs-counter',
              indicatorsId: 'ebs-indicators'
            });
          </script>

          <h3 class="section-subtitle">EBSボリュームタイプ</h3>

          <table class="info-table">
            <thead>
              <tr>
                <th>タイプ</th>
                <th>特徴</th>
                <th>用途</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>gp3</strong><br>(汎用SSD)</td>
                <td>コストと性能のバランス<br>3,000 IOPS基本</td>
                <td>一般的なワークロード<br>ブートボリューム</td>
              </tr>
              <tr>
                <td><strong>io1/io2</strong><br>(プロビジョンドIOPS)</td>
                <td>高性能、低レイテンシー<br>io1: 最大64,000 IOPS<br>io2: 最大256,000 IOPS</td>
                <td>データベース<br>高負荷アプリ</td>
              </tr>
              <tr>
                <td><strong>st1</strong><br>(スループット最適化HDD)</td>
                <td>大容量、高スループット<br>低コスト</td>
                <td>ログ処理<br>データウェアハウス</td>
              </tr>
              <tr>
                <td><strong>sc1</strong><br>(コールドHDD)</td>
                <td>最も低コスト<br>アクセス頻度が低い用途</td>
                <td>アーカイブ<br>バックアップ</td>
              </tr>
            </tbody>
          </table>

          <div class="info-box">
            <div class="info-box-title">&#128161; おすすめ: gp3</div>
            <p>
              特別な要件がなければ、<strong>gp3</strong>を選びましょう。
              gp2より低コストで、性能も十分です。ブートボリュームにも最適です。
              各タイプの最新スペックは<a href="https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html" target="_blank" rel="noopener">EBSボリュームタイプ</a>をご確認ください。
            </p>
          </div>

          <h3 class="section-subtitle">ルートボリュームとデータボリューム</h3>

          <div class="comparison-container">
            <div class="good-example">
              <div class="example-header">
                <span class="example-badge" style="background: #FF9900;">ルートボリューム</span>
              </div>
              <ul class="feature-list">
                <li>OS（オペレーティングシステム）が入るボリューム</li>
                <li>インスタンス起動時に必須</li>
                <li>「インスタンス終了時に削除」がデフォルトでオン</li>
              </ul>
            </div>
            <div class="good-example">
              <div class="example-header">
                <span class="example-badge" style="background: #146EB4;">データボリューム</span>
              </div>
              <ul class="feature-list">
                <li>追加のデータ保存用（オプション）</li>
                <li>サイズは自由に設定可能</li>
                <li>複数のボリュームをアタッチ可能</li>
              </ul>
            </div>
          </div>

          <div class="warning-box">
            <div class="warning-box-title">&#9888; インスタンスストアとの違い</div>
            <p>
              一部のインスタンスタイプには<strong>インスタンスストア</strong>（一時ストレージ）が付属しています。
              インスタンスストアは<strong>インスタンスを停止するとデータが消える</strong>ため、
              永続的なデータはEBSに保存してください。
            </p>
          </div>

          <div class="point-box">
            <div class="point-box-title">&#128161; EBSのベストプラクティス</div>
            <ul class="feature-list">
              <li>定期的にスナップショットを作成してバックアップ</li>
              <li>重要なデータは暗号化を有効化</li>
              <li>適切なボリュームタイプを選択してコスト最適化</li>
              <li>不要になったボリュームは削除（課金対象）</li>
            </ul>
          </div>
        </div>
      `
    },
    // セクション6: キーペアとセキュリティ
    {
      id: "4-5",
      title: "キーペアとセキュリティ",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128273; 4.5 キーペアとセキュリティ</h2>

          <p class="text-paragraph">
            EC2インスタンスに安全に接続するためには、<span class="highlight">キーペア</span>と
            <span class="aws-keyword" data-service="セキュリティグループ">セキュリティグループ</span>の設定が重要です。
          </p>

          <h3 class="section-subtitle">キーペア</h3>

          <div class="term-box">
            <div class="term-box-title">&#128218; キーペアとは？</div>
            <p>
              キーペアは、EC2インスタンスに<strong>SSH接続するための認証情報</strong>です。
              パスワードの代わりに、より安全な公開鍵認証方式を使用します。
            </p>
            <ul class="feature-list" style="margin-top: 12px;">
              <li><strong>公開鍵</strong>：EC2インスタンスに配置される</li>
              <li><strong>秘密鍵</strong>：自分のPCに保存し、接続時に使用</li>
            </ul>
          </div>

          <div class="warning-box">
            <div class="warning-box-title">&#9888; 秘密鍵の管理は最重要</div>
            <p>
              秘密鍵ファイル（.pem）は<strong>ダウンロード時に一度だけ</strong>取得できます。
              紛失すると再発行できません。Session ManagerやEC2 Instance Connectなどの代替手段はありますが、
              <strong>安全な場所に必ず保存</strong>してください。
            </p>
          </div>

          <!-- キーペア スライドショー -->
          <div class="inline-slideshow" id="keypairs-slideshow">
            <div class="inline-slideshow-header">
              <h3 class="inline-slideshow-title">&#128196; キーペア 図解</h3>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="keypairs" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img class="inline-slide-image" id="keypairs-slide-img" src="images/04/Key_Pairs01.png" alt="キーペア 1 / 6">
                </div>
                <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="keypairs" data-dir="next" aria-label="次のスライド">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span class="inline-slide-counter" id="keypairs-counter">1 / 6</span>
              </div>
              <div class="inline-slide-indicators" id="keypairs-indicators"></div>
            </div>
          </div>

          <script>
            initInlineSlideshow('keypairs', {
              folder: 'images/04',
              prefix: 'Key_Pairs',
              pageCount: 6,
              imgId: 'keypairs-slide-img',
              counterId: 'keypairs-counter',
              indicatorsId: 'keypairs-indicators'
            });
          </script>

          <h3 class="section-subtitle">セキュリティグループ</h3>

          <p class="text-paragraph">
            前章で学んだ<span class="aws-keyword" data-service="セキュリティグループ">セキュリティグループ</span>は、
            EC2インスタンスへの<strong>アクセス制御</strong>において重要な役割を果たします。
          </p>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128737;</span>インバウンドルールの例</h4>
            <table class="info-table">
              <thead>
                <tr>
                  <th>タイプ</th>
                  <th>ポート</th>
                  <th>ソース</th>
                  <th>説明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SSH</td>
                  <td>22</td>
                  <td>自分のIP</td>
                  <td>Linux接続用</td>
                </tr>
                <tr>
                  <td>HTTP</td>
                  <td>80</td>
                  <td>0.0.0.0/0</td>
                  <td>Web公開用</td>
                </tr>
                <tr>
                  <td>HTTPS</td>
                  <td>443</td>
                  <td>0.0.0.0/0</td>
                  <td>SSL/TLS通信用</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="point-box">
            <div class="point-box-title">&#128161; セキュリティのベストプラクティス</div>
            <ul class="feature-list">
              <li>SSHポート（22）は<strong>自分のIPアドレスのみ</strong>に制限</li>
              <li>必要なポートのみ開放（最小権限の原則）</li>
              <li>本番環境ではHTTPS（443）を使用</li>
              <li>セキュリティグループは用途ごとに分けて管理</li>
            </ul>
          </div>

          <h3 class="section-subtitle">接続方法</h3>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128421;</span>SSH接続（Linux）</h4>
            <div class="code-block" data-filename="ターミナル">
<button class="copy-btn" onclick="copyCode(this)">コピー</button>
# 秘密鍵のパーミッション変更
chmod 400 my-key.pem

# SSH接続
ssh -i "my-key.pem" ec2-user@パブリックIPアドレス</div>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#127760;</span>EC2 Instance Connect / Session Manager</h4>
            <p class="text-paragraph">
              AWSマネジメントコンソールから<strong>ブラウザ上で直接</strong>接続する方法（EC2 Instance Connect）や、
              <strong>SSHポートを開けずに</strong>接続できるSession Managerも利用できます。
            </p>
          </div>
        </div>
      `
    },
    // ハンズオン1: EC2インスタンスを作成・起動する
    {
      id: "4-handson1",
      title: "ハンズオン1：EC2インスタンスを作成・起動する",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128736; ハンズオン1：EC2インスタンスを作成・起動する</h2>
          
          <div class="point-box">
            <ul class="feature-list">
              <li><strong>操作場所：</strong> AWSマネジメントコンソール</li>
              <li><strong>ゴール：</strong> コンテナを実行するためのEC2インスタンスを作成し、起動する。</li>
            </ul>
          </div>

          <!-- EC2作成全体像 スライドショー -->
          <div class="inline-slideshow" id="create-ec2-all-slideshow">
            <div class="inline-slideshow-header">
              <p class="inline-slideshow-title">EC2の立ち位置</p>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-ec2-all" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img class="inline-slide-image" id="create-ec2-all-slide-img" src="images/04/handson/create-ec2-all01.png" alt="EC2の作成 1 / 1">
                </div>
                <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-ec2-all" data-dir="next" aria-label="次のスライド">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span class="inline-slide-counter" id="create-ec2-all-counter">1 / 1</span>
              </div>
              <div class="inline-slide-indicators" id="create-ec2-all-indicators"></div>
            </div>
          </div>

          <script>
            initInlineSlideshow('create-ec2-all', {
              folder: 'images/04/handson',
              prefix: 'create-ec2-all',
              pageCount: 1,
              imgId: 'create-ec2-all-slide-img',
              counterId: 'create-ec2-all-counter',
              indicatorsId: 'create-ec2-all-indicators'
            });
          </script>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">EC2サービスを開く</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">コンソールの上部の検索窓に「EC2」と入力し、サービス一覧から「EC2」を選択してダッシュボードを開きます。</p>
              
              <!-- EC2作成手順1 スライドショー -->
              <div class="inline-slideshow" id="create-ec2-1-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-ec2-1" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-ec2-1-slide-img" src="images/04/handson/create-ec2-101.png" alt="EC2サービスを開く 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-ec2-1" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-ec2-1-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-ec2-1-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-ec2-1', {
                  folder: 'images/04/handson',
                  prefix: 'create-ec2-1',
                  pageCount: 2,
                  imgId: 'create-ec2-1-slide-img',
                  counterId: 'create-ec2-1-counter',
                  indicatorsId: 'create-ec2-1-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">インスタンスの起動開始</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">左側のメニューの「インスタンス」から「インスタンスを起動」をクリックします。</p>

              <!-- EC2作成手順2 スライドショー -->
              <div class="inline-slideshow" id="create-ec2-2-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-ec2-2" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-ec2-2-slide-img" src="images/04/handson/create-ec2-201.png" alt="EC2サービスを開く 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-ec2-2" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-ec2-2-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-ec2-2-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-ec2-2', {
                  folder: 'images/04/handson',
                  prefix: 'create-ec2-2',
                  pageCount: 1,
                  imgId: 'create-ec2-2-slide-img',
                  counterId: 'create-ec2-2-counter',
                  indicatorsId: 'create-ec2-2-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">名前の設定</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">インスタンスの名前（例: <code>myapp-server-xx</code>）を入力します。</p>
              
              <!-- EC2作成手順3 スライドショー -->
              <div class="inline-slideshow" id="create-ec2-3-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-ec2-3" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-ec2-3-slide-img" src="images/04/handson/create-ec2-301.png" alt="EC2サービスを開く 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-ec2-3" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-ec2-3-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-ec2-3-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-ec2-3', {
                  folder: 'images/04/handson',
                  prefix: 'create-ec2-3',
                  pageCount: 1,
                  imgId: 'create-ec2-3-slide-img',
                  counterId: 'create-ec2-3-counter',
                  indicatorsId: 'create-ec2-3-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">AMIの選択</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">「Amazon Linux」を選択し、Amazon マシンイメージ（AMI）で「Amazon Linux 2023 AMI（無料利用枠の対象）」を選択します。</p>

              <!-- EC2作成手順4 スライドショー -->
              <div class="inline-slideshow" id="create-ec2-4-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-ec2-4" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-ec2-4-slide-img" src="images/04/handson/create-ec2-401.png" alt="EC2サービスを開く 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-ec2-4" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-ec2-4-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-ec2-4-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-ec2-4', {
                  folder: 'images/04/handson',
                  prefix: 'create-ec2-4',
                  pageCount: 1,
                  imgId: 'create-ec2-4-slide-img',
                  counterId: 'create-ec2-4-counter',
                  indicatorsId: 'create-ec2-4-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">5</span>
              <span class="step-title">インスタンスタイプの選択</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">「t2.micro（無料利用枠の対象）」を選択します。</p>

              <!-- EC2作成手順5 スライドショー -->
              <div class="inline-slideshow" id="create-ec2-5-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-ec2-5" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-ec2-5-slide-img" src="images/04/handson/create-ec2-501.png" alt="EC2サービスを開く 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-ec2-5" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-ec2-5-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-ec2-5-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-ec2-5', {
                  folder: 'images/04/handson',
                  prefix: 'create-ec2-5',
                  pageCount: 1,
                  imgId: 'create-ec2-5-slide-img',
                  counterId: 'create-ec2-5-counter',
                  indicatorsId: 'create-ec2-5-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">6</span>
              <span class="step-title">キーペアの作成</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">「新しいキーペアの作成」をクリックし、以下を設定します。</p>
              <ul class="feature-list">
                <li><strong>キーペア名:</strong> <code>myapp-key-xx</code></li>
                <li><strong>キーペアのタイプ:</strong> <code>RSA</code></li>
                <li><strong>キーペアの形式:</strong> <code>.pem</code></li>
              </ul>

              <div class="info-box" style="margin-top: 15px;">
                <div class="info-box-title">&#128269; キーペアのタイプ（RSA vs ED25519）</div>
                <ul class="feature-list" style="margin-top: 8px;">
                  <li><strong>RSA:</strong> 最も一般的な暗号方式で、ほぼすべてのシステムで使えます（今回はこちらを選択）。</li>
                  <li><strong>ED25519:</strong> RSAよりも高速で安全性が高い最新の方式です。一部の古いOSでは使えない場合があります。</li>
                </ul>
              </div>
              <p class="text-paragraph">「キーペアを作成」を押すとファイルがダウンロードされます。<strong>再発行できないので大切に保管してください。</strong></p>

              <!-- EC2作成手順6 スライドショー -->
              <div class="inline-slideshow" id="create-ec2-6-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-ec2-6" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-ec2-6-slide-img" src="images/04/handson/create-ec2-601.png" alt="EC2サービスを開く 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-ec2-6" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-ec2-6-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-ec2-6-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-ec2-6', {
                  folder: 'images/04/handson',
                  prefix: 'create-ec2-6',
                  pageCount: 2,
                  imgId: 'create-ec2-6-slide-img',
                  counterId: 'create-ec2-6-counter',
                  indicatorsId: 'create-ec2-6-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">7</span>
              <span class="step-title">ネットワーク設定</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">「編集」ボタンをクリックして、以下の設定を書き換えます。</p>

              <ul class="feature-list">
                <li><strong>VPC:</strong> デフォルトではなく、自分が作成したVPC (<code>my-vpc-XX</code>) を選択。</li>
                <li><strong>サブネット:</strong> <strong>Public</strong> Subnet (<code>public-subnet-XX</code>) を選択。</li>
                <li><strong>パブリックIPの自動割り当て:</strong> 有効化</li>
                <li><strong>ファイアウォール（セキュリティグループ）:</strong> 既存のセキュリティグループを選択する</li>
                <li><strong>共通のセキュリティグループ:</strong> <code>SgWebXX</code></li>
              </ul>

              <!-- EC2作成手順7 スライドショー -->
              <div class="inline-slideshow" id="create-ec2-7-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-ec2-7" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-ec2-7-slide-img" src="images/04/handson/create-ec2-701.png" alt="EC2サービスを開く 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-ec2-7" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-ec2-7-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-ec2-7-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-ec2-7', {
                  folder: 'images/04/handson',
                  prefix: 'create-ec2-7',
                  pageCount: 2,
                  imgId: 'create-ec2-7-slide-img',
                  counterId: 'create-ec2-7-counter',
                  indicatorsId: 'create-ec2-7-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">8</span>
              <span class="step-title">ストレージの設定</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">デフォルトの <strong>8 GiB (gp3)</strong> のままでOKです。</p>

              <!-- EC2作成手順8 スライドショー -->
              <div class="inline-slideshow" id="create-ec2-8-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-ec2-8" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-ec2-8-slide-img" src="images/04/handson/create-ec2-801.png" alt="EC2サービスを開く 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-ec2-8" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-ec2-8-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-ec2-8-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-ec2-8', {
                  folder: 'images/04/handson',
                  prefix: 'create-ec2-8',
                  pageCount: 1,
                  imgId: 'create-ec2-8-slide-img',
                  counterId: 'create-ec2-8-counter',
                  indicatorsId: 'create-ec2-8-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">9</span>
              <span class="step-title">起動の確認</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">画面右側の「インスタンスを起動」をクリックし、ステータスが「実行中 (running)」になるまで待ちます。</p>

              <!-- EC2作成手順9 スライドショー -->
              <div class="inline-slideshow" id="create-ec2-9-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-ec2-9" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-ec2-9-slide-img" src="images/04/handson/create-ec2-901.png" alt="EC2サービスを開く 1 / 3">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-ec2-9" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-ec2-9-counter">1 / 3</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-ec2-9-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-ec2-9', {
                  folder: 'images/04/handson',
                  prefix: 'create-ec2-9',
                  pageCount: 3,
                  imgId: 'create-ec2-9-slide-img',
                  counterId: 'create-ec2-9-counter',
                  indicatorsId: 'create-ec2-9-indicators'
                });
              </script>
            </div>
          </div>
        </div>
      `
    },
    // ハンズオン2: EC2インスタンスにSSH接続する
    {
      id: "4-handson2",
      title: "ハンズオン2：EC2インスタンスにSSH接続する",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128736; ハンズオン2：EC2インスタンスにSSH接続する</h2>
          
          <div class="point-box">
            <ul class="feature-list">
              <li><strong>操作場所：</strong> AWSマネジメントコンソール ＆ ローカル（Macのターミナル）</li>
              <li><strong>ゴール：</strong> 起動したEC2インスタンスに、ダウンロードしたキーペアを使って安全にSSH接続する。</li>
            </ul>
          </div>

          <!-- EC2接続全体像 スライドショー -->
          <div class="inline-slideshow" id="connect-ec2-all-slideshow">
            <div class="inline-slideshow-header">
              <p class="inline-slideshow-title">EC2への接続イメージ</p>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="connect-ec2-all" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img class="inline-slide-image" id="connect-ec2-all-slide-img" src="images/04/handson/connect-ec2-all01.png" alt="EC2接続続 1 / 1">
                </div>
                <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="connect-ec2-all" data-dir="next" aria-label="次のスライド">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span class="inline-slide-counter" id="connect-ec2-all-counter">1 / 1</span>
              </div>
              <div class="inline-slide-indicators" id="connect-ec2-all-indicators"></div>
            </div>
          </div>

          <script>
            initInlineSlideshow('connect-ec2-all', {
              folder: 'images/04/handson',
              prefix: 'connect-ec2-all',
              pageCount: 1,
              imgId: 'connect-ec2-all-slide-img',
              counterId: 'connect-ec2-all-counter',
              indicatorsId: 'connect-ec2-all-indicators'
            });
          </script>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">IPアドレスの確認</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【AWSマネジメントコンソール】</strong></p>
              <p class="text-paragraph">左側のメニューの「インスタンス」からインスタンス一覧を開き、前のセクションで作成したEC2インスタンスを選択します。</p>
              <p class="text-paragraph">詳細タブにある <strong>「パブリック IPv4 アドレス」</strong> をコピーしてメモしておきます（例: 54.xxx.xxx.xxx）。</p>

              <div class="info-box" style="margin-top: 15px;">
                <div class="info-box-title">&#128161; パブリックIPアドレスに関する注意</div>
                <p>
                  このパブリックIPアドレスは、<strong>インスタンスを一度停止（ストップ）して再起動すると新しいIPアドレスが再割り当てされるため、値が変わります。</strong><br>
                  後日改めて起動して接続する場合は、再度コンソールから新しいIPアドレスを確認するようにしてください。（※IPアドレスを固定する「Elastic IP」という機能もありますが、本ハンズオンでは使用しません）
                </p>
              </div>

              <!-- EC2接続手順1 スライドショー -->
              <div class="inline-slideshow" id="connect-ec2-1-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="connect-ec2-1" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="connect-ec2-1-slide-img" src="images/04/handson/connect-ec2-101.png" alt="EC2サービスを開く 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="connect-ec2-1" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="connect-ec2-1-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="connect-ec2-1-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('connect-ec2-1', {
                  folder: 'images/04/handson',
                  prefix: 'connect-ec2-1',
                  pageCount: 1,
                  imgId: 'connect-ec2-1-slide-img',
                  counterId: 'connect-ec2-1-counter',
                  indicatorsId: 'connect-ec2-1-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">ディレクトリの移動</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【ローカル】</strong>Macのターミナルを開き、キーペア（<code>.pem</code>）をダウンロードしたディレクトリに移動します。（Downloadsフォルダに保存した場合）</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>cd ~/Downloads</div>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">権限の変更</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【ローカル】</strong>秘密鍵の権限が広すぎると接続が拒否されるため、以下のコマンドで自分だけが読み取れるようにパーミッションを変更します。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>chmod 400 myapp-key-XX.pem</div>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">SSH接続</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【ローカル】</strong>以下のコマンドを実行して、EC2インスタンスに接続します。(IPアドレスはご自身で取得したものに置き換えてください)</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>ssh -i "myapp-key-XX.pem" ec2-user@54.xxx.xxx.xxx</div>

              <div class="info-box" style="margin: 15px 0;">
                <div class="info-box-title">&#128269; sshコマンドの構文</div>
                <p>このコマンドは、以下のような意味で組み立てられています。</p>
                <ul class="feature-list" style="margin-top: 8px;">
                  <li><code>ssh</code>：サーバーに安全に遠隔接続するためのコマンド</li>
                  <li><code>-i "xxx.pem"</code>：[オプション] ログインするための鍵（身分証）ファイル</li>
                  <li><code>ec2-user</code>：接続先のサーバーのユーザー名（Amazon Linuxのデフォルトユーザー）</li>
                  <li><code>@[IPアドレス]</code>：接続先のサーバーのIPアドレス（住所）</li>
                </ul>
              </div>

              <p class="text-paragraph">初回接続時に「<code>Are you sure you want to continue connecting (yes/no/[fingerprint])?</code>」と聞かれたら <code>yes</code> と入力してEnterを押します。</p>

              <!-- EC2接続手順4 スライドショー -->
              <div class="inline-slideshow" id="connect-ec2-4-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="connect-ec2-4" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="connect-ec2-4-slide-img" src="images/04/handson/connect-ec2-401.png" alt="EC2にSSH接続する 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="connect-ec2-4" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="connect-ec2-4-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="connect-ec2-4-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('connect-ec2-4', {
                  folder: 'images/04/handson',
                  prefix: 'connect-ec2-4',
                  pageCount: 1,
                  imgId: 'connect-ec2-4-slide-img',
                  counterId: 'connect-ec2-4-counter',
                  indicatorsId: 'connect-ec2-4-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">5</span>
              <span class="step-title">接続の確認</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【ローカル】</strong>画面に 「Amazon Linux 2023」 のロゴが表示され、プロンプトが <code>[ec2-user@ip-xxx-xxx-xxx-xxx ~]$</code> のように変われば、接続成功です。</p>

              <!-- EC2接続手順5 スライドショー -->
              <div class="inline-slideshow" id="connect-ec2-5-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="connect-ec2-5" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="connect-ec2-5-slide-img" src="images/04/handson/connect-ec2-501.png" alt="EC2にSSH接続する 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="connect-ec2-5" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="connect-ec2-5-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="connect-ec2-5-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('connect-ec2-5', {
                  folder: 'images/04/handson',
                  prefix: 'connect-ec2-5',
                  pageCount: 1,
                  imgId: 'connect-ec2-5-slide-img',
                  counterId: 'connect-ec2-5-counter',
                  indicatorsId: 'connect-ec2-5-indicators'
                });
              </script>
            </div>
          </div>
        </div>
      `
    },
    // ハンズオン3: ターミナルからEC2へファイルを転送する
    {
      id: "4-handson3",
      title: "ハンズオン3：ターミナルからEC2へファイルを転送する",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128736; ハンズオン3：ターミナルからEC2へファイルを転送する</h2>
          
          <div class="point-box">
            <ul class="feature-list">
              <li><strong>操作場所：</strong> ローカル（Macのターミナル） ＆ EC2上</li>
              <li><strong>ゴール：</strong> Macのローカル環境からEC2インスタンスへ、<code>scp</code>コマンドを使って安全にファイルを転送する。</li>
            </ul>
          </div>


          <!-- EC2送信全体像 スライドショー -->
          <div class="inline-slideshow" id="transfer-ec2-all-slideshow">
            <div class="inline-slideshow-header">
              <p class="inline-slideshow-title">EC2へのファイル転送イメージ</p>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="transfer-ec2-all" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img class="inline-slide-image" id="transfer-ec2-all-slide-img" src="images/04/handson/transfer-ec2-all01.png" alt="EC2の作成 1 / 1">
                </div>
                <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="transfer-ec2-all" data-dir="next" aria-label="次のスライド">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span class="inline-slide-counter" id="transfer-ec2-all-counter">1 / 1</span>
              </div>
              <div class="inline-slide-indicators" id="transfer-ec2-all-indicators"></div>
            </div>
          </div>

          <script>
            initInlineSlideshow('transfer-ec2-all', {
              folder: 'images/04/handson',
              prefix: 'transfer-ec2-all',
              pageCount: 1,
              imgId: 'transfer-ec2-all-slide-img',
              counterId: 'transfer-ec2-all-counter',
              indicatorsId: 'transfer-ec2-all-indicators'
            });
          </script>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">新しいターミナルを開く</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【ローカル】</strong> ハンズオン2でSSH接続しているターミナルとは<strong>別の新しいターミナルタブ（またはウィンドウ）</strong>を開きます。</p>
            </div>
          </div>

          
          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">ディレクトリの移動</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【ローカル】</strong> キーペアがあるディレクトリに移動します（例： <code>cd ~/Downloads</code>）。</p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">テストファイルの作成</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【ローカル】</strong> 転送するためのテストファイルを作成します。以下のコマンドを実行してください。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>echo "Hello AWS! by Taro" &gt; hello.txt</div>
              <p class="text-paragraph">以下のコマンドでファイルの中身を確認できます。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>cat hello.txt</div>

              
              <!-- EC2送信手順3 スライドショー -->
              <div class="inline-slideshow" id="transfer-ec2-3-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="transfer-ec2-3" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="transfer-ec2-3-slide-img" src="images/04/handson/transfer-ec2-301.png" alt="EC2にSSH接続する 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="transfer-ec2-3" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="transfer-ec2-3-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="transfer-ec2-3-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('transfer-ec2-3', {
                  folder: 'images/04/handson',
                  prefix: 'transfer-ec2-3',
                  pageCount: 1,
                  imgId: 'transfer-ec2-3-slide-img',
                  counterId: 'transfer-ec2-3-counter',
                  indicatorsId: 'transfer-ec2-3-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">scpコマンドの実行</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【ローカル】</strong> <code>scp</code> コマンドを実行して、テストファイルをEC2へ転送します。(54.xxx.xxx.xxxの部分はご自身のEC2のIPアドレスに置き換えてください)</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>scp -i "myapp-key-XX.pem" hello.txt ec2-user@54.xxx.xxx.xxx:~/</div>

              <div class="info-box" style="margin: 15px 0;">
                <div class="info-box-title">&#128269; scpコマンドの構文</div>
                <p>このコマンドは、以下のような構造になっています。</p>
                <ul class="feature-list" style="margin-top: 8px;">
                  <li><code>scp</code>：ネットワーク越しにファイルを安全にコピー（Secure Copy）するコマンド</li>
                  <li><code>-i "xxx.pem"</code>：[オプション] 認証用の鍵ファイル</li>
                  <li><code>hello.txt</code>：<strong>送信元</strong>（ローカル側）のファイルパス</li>
                  <li><code>ec2-user@...</code>：<strong>送信先</strong>のユーザー名とサーバーのIPアドレス</li>
                  <li><code>:~/</code>：送信先のどこのディレクトリに置くか（<code>~/</code> はec2-userのホームディレクトリ）</li>
                </ul>
              </div>

              <!-- EC2送信手順4 スライドショー -->
              <div class="inline-slideshow" id="transfer-ec2-4-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="transfer-ec2-4" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="transfer-ec2-4-slide-img" src="images/04/handson/transfer-ec2-401.png" alt="EC2にSSH接続する 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="transfer-ec2-4" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="transfer-ec2-4-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="transfer-ec2-4-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('transfer-ec2-4', {
                  folder: 'images/04/handson',
                  prefix: 'transfer-ec2-4',
                  pageCount: 1,
                  imgId: 'transfer-ec2-4-slide-img',
                  counterId: 'transfer-ec2-4-counter',
                  indicatorsId: 'transfer-ec2-4-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">5</span>
              <span class="step-title">EC2ターミナルへの移動</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【EC2上】</strong> ハンズオン2でSSH接続したままになっているEC2のターミナル画面に戻ります。</p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">6</span>
              <span class="step-title">転送の確認</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【EC2上】</strong> 以下のコマンドを実行し、ファイルが転送されているか確認します。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>ls</div>
              <p class="text-paragraph">中身を確認します。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>cat hello.txt</div>
              <p class="text-paragraph">「Hello AWS!」と表示されれば成功です。</p>

              <!-- EC2送信手順6 スライドショー -->
              <div class="inline-slideshow" id="transfer-ec2-6-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="transfer-ec2-6" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="transfer-ec2-6-slide-img" src="images/04/handson/transfer-ec2-601.png" alt="EC2にSSH接続する 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="transfer-ec2-6" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="transfer-ec2-6-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="transfer-ec2-6-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('transfer-ec2-6', {
                  folder: 'images/04/handson',
                  prefix: 'transfer-ec2-6',
                  pageCount: 1,
                  imgId: 'transfer-ec2-6-slide-img',
                  counterId: 'transfer-ec2-6-counter',
                  indicatorsId: 'transfer-ec2-6-indicators'
                });
              </script>
            </div>
          </div>
          

          <div class="summary-box">
            <h3 class="summary-title">&#128203; 第4章のまとめ</h3>
            <ul class="summary-list">
              <li><strong>EC2</strong>：AWS上の仮想サーバー。数分で起動し、従量課金で利用可能</li>
              <li><strong>インスタンスタイプ</strong>：ファミリー.サイズの形式でスペックを選択（学習にはt3.micro）</li>
              <li><strong>AMI</strong>：OS・アプリケーションを含むサーバーテンプレート</li>
              <li><strong>EBS</strong>：永続的なブロックストレージ（おすすめはgp3）</li>
              <li><strong>キーペア</strong>：SSH接続のための公開鍵認証</li>
              <li><strong>セキュリティグループ</strong>：仮想ファイアウォールでアクセス制御</li>
            </ul>
          </div>

          <div class="point-box" style="margin-top: 30px;">
            <div class="point-box-title">&#128214; AWS公式ドキュメント参照先</div>
            <ul class="feature-list">
              <li><a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html" target="_blank" rel="noopener">EC2とは（User Guide）</a> / <a href="https://aws.amazon.com/ec2/pricing/" target="_blank" rel="noopener">EC2料金</a></li>
              <li><a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html" target="_blank" rel="noopener">インスタンスタイプ</a> / <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/burstable-performance-instances.html" target="_blank" rel="noopener">バーストパフォーマンス</a></li>
              <li><a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html" target="_blank" rel="noopener">AMI（マシンイメージ）</a></li>
              <li><a href="https://docs.aws.amazon.com/linux/al2023/ug/what-is-amazon-linux.html" target="_blank" rel="noopener">Amazon Linux 2023</a></li>
              <li><a href="https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html" target="_blank" rel="noopener">EBSとは</a> / <a href="https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html" target="_blank" rel="noopener">EBSボリュームタイプ</a></li>
              <li><a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html" target="_blank" rel="noopener">キーペア</a></li>
              <li><a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-linux-inst-eic.html" target="_blank" rel="noopener">EC2 Instance Connect</a> / <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html" target="_blank" rel="noopener">Session Manager</a></li>
            </ul>
          </div>
        </div>
      `
    },
    // セクション: 理解度テスト
    {
      id: "4-quiz",
      title: "第4章 理解度テスト",
      type: "quiz",
      questions: [
        {
          question: "EC2（Elastic Compute Cloud）の説明として正しいものはどれですか？",
          options: [
            { label: "A", text: "AWSのオブジェクトストレージサービス" },
            { label: "B", text: "AWSのネットワーク監視サービス" },
            { label: "C", text: "AWSのデータベースサービス" },
            { label: "D", text: "AWS上で仮想サーバーを起動・管理できるサービス" }
          ],
          correct: 3,
          explanation: {
            correct: "正解です！EC2はAWS上で仮想サーバー（インスタンス）を起動・管理できるサービスです。数分でサーバーを起動でき、必要に応じてスケールできます。",
            incorrect: "不正解です。EC2（Elastic Compute Cloud）はAWS上で仮想サーバー（インスタンス）を起動・管理できるサービスです。"
          }
        },
        {
          question: "インスタンスタイプ「t3.micro」の読み方として正しいものはどれですか？",
          options: [
            { label: "A", text: "t3がファミリー（汎用バースト型）、microがサイズを表す" },
            { label: "B", text: "t3がサイズ、microがファミリーを表す" },
            { label: "C", text: "t3がリージョン、microがAZを表す" },
            { label: "D", text: "t3がOS、microがストレージサイズを表す" }
          ],
          correct: 0,
          explanation: {
            correct: "正解です！インスタンスタイプは「ファミリー.サイズ」の形式です。t3は汎用バースト型ファミリー、microはサイズを表します。",
            incorrect: "不正解です。インスタンスタイプは「ファミリー.サイズ」の形式で、t3がファミリー（汎用バースト型）、microがサイズを表します。"
          }
        },
        {
          question: "AMI（Amazon Machine Image）の説明として正しいものはどれですか？",
          options: [
            { label: "A", text: "EC2インスタンスのCPU性能を決めるもの" },
            { label: "B", text: "EC2インスタンスに接続するための認証情報" },
            { label: "C", text: "OSやアプリケーションを含むサーバーのテンプレート" },
            { label: "D", text: "EC2インスタンスのネットワーク設定" }
          ],
          correct: 2,
          explanation: {
            correct: "正解です！AMIはOSやアプリケーション、設定を含むサーバーのテンプレートです。AMIを選ぶだけで、必要なソフトウェアが入った状態でサーバーを起動できます。",
            incorrect: "不正解です。AMIはOSやアプリケーション、設定を含むサーバーのテンプレートです。1つのAMIから複数のインスタンスを起動できます。"
          }
        },
        {
          question: "EBS（Elastic Block Store）の特徴として正しいものはどれですか？",
          options: [
            { label: "A", text: "インスタンスを停止するとデータが消える一時ストレージ" },
            { label: "B", text: "インスタンスを停止してもデータが保持される永続的なストレージ" },
            { label: "C", text: "インターネット上のファイル共有サービス" },
            { label: "D", text: "データベース専用のストレージサービス" }
          ],
          correct: 1,
          explanation: {
            correct: "正解です！EBSはEC2用の永続的なブロックストレージで、インスタンスを停止してもデータが保持されます。スナップショットでバックアップも作成できます。",
            incorrect: "不正解です。EBSは永続的なストレージで、インスタンスを停止してもデータが保持されます。一時的なストレージはインスタンスストアです。"
          }
        },
        {
          question: "EC2インスタンスにSSH接続するために必要なものはどれですか？",
          options: [
            { label: "A", text: "IAMポリシー" },
            { label: "B", text: "キーペア（秘密鍵）" },
            { label: "C", text: "S3バケット" },
            { label: "D", text: "CloudFrontディストリビューション" }
          ],
          correct: 1,
          explanation: {
            correct: "正解です！EC2インスタンスにSSH接続するにはキーペア（秘密鍵）が必要です。秘密鍵はインスタンス作成時に一度だけダウンロードできるため、安全に保管してください。",
            incorrect: "不正解です。EC2インスタンスにSSH接続するにはキーペア（秘密鍵）が必要です。パスワードの代わりに公開鍵認証方式を使用します。"
          }
        }
      ]
    }
  ]
};
