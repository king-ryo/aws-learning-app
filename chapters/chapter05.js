// ========================================
// 第5章: データベースサービス（RDS）
// ========================================
const chapter05 = {
  id: 5,
  title: "データベースサービス（RDS）",
  sections: [
    // セクション1: この章で学ぶこと
    {
      id: "5-intro",
      title: "この章で学ぶこと",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <div class="chapter-intro-banner">
            <div class="chapter-number">CHAPTER 05</div>
            <h1 class="chapter-main-title">データベースサービス（RDS）</h1>
            <p class="chapter-subtitle">マネージドデータベースで運用負荷を軽減しよう</p>
          </div>

          <div class="learning-goals">
            <h3 class="learning-goals-title">&#127919; この章の学習目標</h3>
            <ul class="learning-goals-list">
              <li>RDSとは何かを理解する</li>
              <li>対応するDBエンジンの種類を把握する</li>
              <li>マルチAZ配置の仕組みを説明できる</li>
              <li>リードレプリカの用途を理解する</li>
              <li>RDSのセキュリティ設定を理解する</li>
            </ul>
          </div>

          <h2 class="section-title">&#128218; はじめに</h2>

          <p class="text-paragraph">
            アプリケーションを構築する際、データを永続的に保存する<strong>データベース</strong>が必要です。
            この章では、AWSのマネージドデータベースサービスである
            <strong><span class="aws-keyword" data-service="RDS">RDS</span>（Relational Database Service）</strong>を学びます。
          </p>

          <div class="info-box">
            <div class="info-box-title">&#128161; マネージドサービスとは？</div>
            <p>
              RDSは<strong>マネージドサービス</strong>です。データベースのセットアップ、パッチ適用、
              バックアップなどの運用タスクをAWSが自動で行ってくれます。
              開発者はアプリケーション開発に集中できます。
            </p>
          </div>

          <h3 class="section-subtitle">この章の構成</h3>
          <ul class="feature-list">
            <li><strong>5.1 RDSとは</strong> - RDSの基本概念を学びます</li>
            <li><strong>5.2 DBエンジン</strong> - 利用可能なデータベースエンジンを理解します</li>
            <li><strong>5.3 高可用性</strong> - マルチAZとリードレプリカを学びます</li>
            <li><strong>5.4 セキュリティ</strong> - データベースの保護方法を理解します</li>
            <li><strong>理解度テスト</strong> - この章の内容を確認します</li>
          </ul>
        </div>
      `
    },
    // セクション2: RDSとは
    {
      id: "5-1",
      title: "RDSとは",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128451; 5.1 RDSとは</h2>

          <p class="text-paragraph">
            <span class="highlight">RDS（Relational Database Service）</span>は、
            AWSが提供する<strong>フルマネージド型リレーショナルデータベース</strong>サービスです。
          </p>

          <div class="term-box">
            <div class="term-box-title">&#128218; リレーショナルデータベースとは？</div>
            <p>
              データを<strong>テーブル（表）形式</strong>で管理するデータベースです。
              行と列で構成され、SQLという言語でデータの操作を行います。
              顧客情報、商品情報、注文履歴など、<strong>構造化されたデータ</strong>の管理に適しています。
            </p>
          </div>

          <h3 class="section-subtitle">EC2上でDBを構築する場合との比較</h3>

          <div class="comparison-container">
            <div class="bad-example">
              <div class="example-header">
                <span class="example-badge">大変</span>
                <span class="example-title">EC2 + 自前DB</span>
              </div>
              <ul class="feature-list">
                <li>DBソフトウェアのインストール</li>
                <li>OSとDBのパッチ適用</li>
                <li>バックアップの設定と管理</li>
                <li>障害時の復旧作業</li>
                <li>スケーリングの手動対応</li>
              </ul>
            </div>
            <div class="good-example">
              <div class="example-header">
                <span class="example-badge">楽</span>
                <span class="example-title">RDS（マネージド）</span>
              </div>
              <ul class="feature-list">
                <li>数クリックでDB起動</li>
                <li>パッチ適用は自動</li>
                <li>自動バックアップ</li>
                <li>マルチAZで自動フェイルオーバー</li>
                <li>ボタン一つでスケーリング</li>
              </ul>
            </div>
          </div>

          <h3 class="section-subtitle">RDSの主な機能</h3>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128260;</span>自動バックアップ</h4>
            <p class="text-paragraph">
              毎日自動でバックアップを取得し、最大35日間保持します。
              任意の時点に<strong>ポイントインタイムリカバリ</strong>で復元できます。
            </p>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128295;</span>自動パッチ適用</h4>
            <p class="text-paragraph">
              DBエンジンのセキュリティパッチが自動的に適用されます。
              適用タイミング（メンテナンスウィンドウ）は指定できます。
            </p>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128202;</span>モニタリング</h4>
            <p class="text-paragraph">
              <span class="aws-keyword" data-service="CloudWatch">CloudWatch</span>と連携して、
              CPU使用率、接続数、ストレージ使用量などを監視できます。
            </p>
          </div>

          <div class="inline-slideshow">
            <div class="inline-slideshow-header">
              <span class="inline-slideshow-title">&#128451; RDSアーキテクチャ図解</span>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow" data-slideshow="rds" data-dir="prev" disabled>&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img id="rds-slide-img" class="inline-slide-image" src="images/05/rds01.png" alt="RDS 1 / 10">
                </div>
                <button class="inline-slide-arrow" data-slideshow="rds" data-dir="next">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span id="rds-slide-counter" class="inline-slide-counter">1 / 10</span>
              </div>
              <div id="rds-slide-indicators" class="inline-slide-indicators"></div>
            </div>
          </div>
          <script>
            initInlineSlideshow('rds', {
              imgId: 'rds-slide-img',
              counterId: 'rds-slide-counter',
              indicatorsId: 'rds-slide-indicators',
              folder: 'images/05',
              prefix: 'rds',
              pageCount: 10
            });
          </script>

          <h3 class="section-subtitle">RDSの配置場所</h3>

          <p class="text-paragraph">
            RDSインスタンスは、EC2と同様に<span class="aws-keyword" data-service="VPC">VPC</span>内に配置されます。
            通常は<strong>プライベートサブネット</strong>に配置し、外部からの直接アクセスを防ぎます。
          </p>

          <div class="point-box">
            <div class="point-box-title">&#128161; DBサブネットグループ</div>
            <p>
              RDSを起動するには、<strong>DBサブネットグループ</strong>を作成する必要があります。
              これは、RDSが使用できるサブネットのリストです。
              高可用性のため、<strong>異なるAZの2つ以上のサブネット</strong>を含める必要があります。
            </p>
          </div>
        </div>
      `
    },
    // セクション3: DBエンジン
    {
      id: "5-2",
      title: "DBエンジン",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128736; 5.2 DBエンジン</h2>

          <p class="text-paragraph">
            RDSでは、複数の<span class="highlight">DBエンジン</span>から選択できます。
            用途や既存システムとの互換性に応じて選びましょう。
          </p>

          <h3 class="section-subtitle">対応DBエンジン一覧</h3>

          <table class="info-table">
            <thead>
              <tr>
                <th>DBエンジン</th>
                <th>特徴</th>
                <th>おすすめ用途</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Amazon Aurora</strong></td>
                <td>AWS独自開発<br>MySQL/PostgreSQL互換<br>高性能・高可用性</td>
                <td>本番環境<br>高負荷システム</td>
              </tr>
              <tr>
                <td><strong>MySQL</strong></td>
                <td>最も普及したオープンソースDB<br>豊富な情報・ノウハウ</td>
                <td>Webアプリ全般<br>WordPress等</td>
              </tr>
              <tr>
                <td><strong>PostgreSQL</strong></td>
                <td>高機能オープンソースDB<br>地理情報対応</td>
                <td>複雑なクエリ<br>地理情報システム</td>
              </tr>
              <tr>
                <td><strong>MariaDB</strong></td>
                <td>MySQLから派生<br>オープンソース</td>
                <td>MySQL代替</td>
              </tr>
              <tr>
                <td><strong>Oracle</strong></td>
                <td>エンタープライズ向け<br>高機能・高信頼性</td>
                <td>基幹システム</td>
              </tr>
              <tr>
                <td><strong>SQL Server</strong></td>
                <td>Microsoft製DB<br>.NETとの親和性</td>
                <td>Windows環境<br>.NETアプリ</td>
              </tr>
              <tr>
                <td><strong>IBM Db2</strong></td>
                <td>IBM製エンタープライズDB<br>2023年より対応</td>
                <td>IBM環境<br>メインフレーム移行</td>
              </tr>
            </tbody>
          </table>

          <h3 class="section-subtitle">Amazon Auroraとは</h3>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#127775;</span>AWS独自開発の高性能DB</h4>
            <p class="text-paragraph">
              <strong>Amazon Aurora</strong>は、AWSがクラウド向けに一から設計したデータベースです。
              MySQLの最大5倍、PostgreSQLの最大3倍のスループットを実現します。
            </p>
            <div class="point-box">
              <div class="point-box-title">&#128161; Auroraの特徴</div>
              <ul class="feature-list">
                <li>MySQL/PostgreSQLと互換性があり、既存アプリをそのまま移行可能</li>
                <li>ストレージは自動で拡張（大容量まで対応）</li>
                <li>データは3つのAZに6つのコピーを自動作成</li>
              </ul>
            </div>
          </div>

          <h3 class="section-subtitle">DBエンジンの選び方</h3>

          <div class="info-box">
            <div class="info-box-title">&#128161; 選び方のポイント</div>
            <ul class="feature-list">
              <li><strong>新規開発</strong>：MySQL または PostgreSQL（無料で豊富な情報）</li>
              <li><strong>高性能が必要</strong>：Amazon Aurora</li>
              <li><strong>既存システムの移行</strong>：現在使用中のDBエンジン</li>
              <li><strong>Windowsアプリ</strong>：SQL Server</li>
            </ul>
          </div>
        </div>
      `
    },
    // セクション4: 高可用性
    {
      id: "5-3",
      title: "高可用性（マルチAZ・リードレプリカ）",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128737; 5.3 高可用性（マルチAZ・リードレプリカ）</h2>

          <p class="text-paragraph">
            本番環境のデータベースは、障害が発生してもサービスを継続できる<span class="highlight">高可用性</span>が求められます。
            RDSでは、<strong>マルチAZ配置</strong>と<strong>リードレプリカ</strong>でこれを実現します。
          </p>

          <h3 class="section-subtitle">マルチAZ配置</h3>

          <div class="term-box">
            <div class="term-box-title">&#128218; マルチAZ配置とは？</div>
            <p>
              プライマリDBとは<strong>別のAZ</strong>にスタンバイDBを自動作成し、
              データを<strong>同期レプリケーション</strong>する構成です。
              プライマリに障害が発生すると、<strong>自動的にスタンバイに切り替わり</strong>（フェイルオーバー）、
              サービスを継続できます。
            </p>
          </div>

          <div class="point-box">
            <div class="point-box-title">&#128161; マルチAZのメリット</div>
            <ul class="feature-list">
              <li>AZ障害時に<strong>自動でフェイルオーバー</strong>（通常1〜2分）</li>
              <li>アプリケーション側の変更は<strong>不要</strong>（エンドポイントは同じ）</li>
              <li>メンテナンス時のダウンタイムを<strong>最小化</strong></li>
            </ul>
          </div>

          <div class="warning-box">
            <div class="warning-box-title">&#9888; コストに注意</div>
            <p>
              マルチAZ配置は、<strong>シングルAZより料金が高くなります</strong>。
              開発環境ではシングルAZ、本番環境ではマルチAZという使い分けが一般的です。
              料金の詳細は<a href="https://aws.amazon.com/rds/pricing/" target="_blank" rel="noopener">RDS料金ページ</a>をご確認ください。
            </p>
          </div>

          <h3 class="section-subtitle">リードレプリカ</h3>

          <div class="term-box">
            <div class="term-box-title">&#128218; リードレプリカとは？</div>
            <p>
              プライマリDBの<strong>読み取り専用のコピー</strong>を作成する機能です。
              データは<strong>非同期レプリケーション</strong>で複製されます。
              読み取り処理をリードレプリカに分散することで、<strong>読み取り性能を向上</strong>できます。
            </p>
          </div>

          <div class="comparison-container">
            <div class="good-example">
              <div class="example-header">
                <span class="example-badge" style="background: #FF9900;">マルチAZ</span>
              </div>
              <ul class="feature-list">
                <li>目的：<strong>高可用性</strong></li>
                <li>スタンバイは読み取り<strong>不可</strong></li>
                <li><strong>同期</strong>レプリケーション</li>
                <li>障害時に<strong>自動</strong>フェイルオーバー</li>
              </ul>
            </div>
            <div class="good-example">
              <div class="example-header">
                <span class="example-badge" style="background: #146EB4;">リードレプリカ</span>
              </div>
              <ul class="feature-list">
                <li>目的：<strong>読み取り性能向上</strong></li>
                <li>読み取り<strong>可能</strong></li>
                <li><strong>非同期</strong>レプリケーション</li>
                <li>フェイルオーバーは<strong>手動</strong></li>
              </ul>
            </div>
          </div>

          <div class="info-box">
            <div class="info-box-title">&#128161; マルチAZ DBクラスターについて</div>
            <p>
              上記の比較は従来の<strong>マルチAZ DBインスタンス</strong>（シングルスタンバイ）の場合です。
              最新の<strong>マルチAZ DBクラスター</strong>構成では、2つの読み取り可能なスタンバイを持ち、
              スタンバイからの読み取りも可能です（MySQL/PostgreSQL対応）。
            </p>
          </div>

          <div class="info-box">
            <div class="info-box-title">&#128161; リードレプリカの活用例</div>
            <ul class="feature-list">
              <li>レポート作成などの重い読み取りクエリを分散</li>
              <li>別リージョンにレプリカを作成して災害対策（クロスリージョンレプリカ）</li>
            </ul>
          </div>
        </div>
      `
    },
    // セクション5: セキュリティ
    {
      id: "5-4",
      title: "セキュリティ",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128274; 5.4 セキュリティ</h2>

          <p class="text-paragraph">
            データベースには機密性の高い情報が格納されるため、
            <span class="highlight">セキュリティ対策</span>は非常に重要です。
          </p>

          <h3 class="section-subtitle">ネットワークセキュリティ</h3>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128274;</span>プライベートサブネットへの配置</h4>
            <p class="text-paragraph">
              RDSインスタンスは<strong>プライベートサブネット</strong>に配置し、
              インターネットからの直接アクセスを<strong>遮断</strong>します。
            </p>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128737;</span>セキュリティグループ</h4>
            <p class="text-paragraph">
              RDSにも<span class="aws-keyword" data-service="セキュリティグループ">セキュリティグループ</span>を設定します。
              <strong>アプリケーションサーバーからのみ</strong>接続を許可するのが一般的です。
            </p>
          </div>

          <h3 class="section-subtitle">暗号化</h3>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128272;</span>保管時の暗号化</h4>
            <p class="text-paragraph">
              RDSでは、ストレージ、バックアップ、スナップショット、リードレプリカを
              <strong>AES-256で暗号化</strong>できます。
              <span class="aws-keyword" data-service="KMS">KMS</span>（Key Management Service）と連携して暗号化キーを管理します。
            </p>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128274;</span>転送時の暗号化</h4>
            <p class="text-paragraph">
              アプリケーションとRDS間の通信は<strong>SSL/TLS</strong>で暗号化できます。
            </p>
          </div>

          <h3 class="section-subtitle">アクセス管理</h3>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128100;</span>マスターユーザー</h4>
            <p class="text-paragraph">
              RDSインスタンス作成時に、<strong>マスターユーザー</strong>（管理者アカウント）を設定します。
              AWS Secrets Managerを使用すると、パスワードの自動ローテーションが可能です。
            </p>
          </div>

          <div class="summary-box">
            <h3 class="summary-title">&#127881; 第5章 完了！</h3>
            <p class="text-paragraph">
              お疲れさまでした！この章では、RDSの基本を学びました。
            </p>
            <ul class="summary-list">
              <li>RDSは<strong>フルマネージド型</strong>リレーショナルデータベースサービス</li>
              <li>MySQL、PostgreSQL、Aurora等の<strong>DBエンジン</strong>に対応</li>
              <li><strong>マルチAZ配置</strong>で高可用性を実現（自動フェイルオーバー）</li>
              <li><strong>リードレプリカ</strong>で読み取り性能を向上</li>
              <li><strong>プライベートサブネット</strong>に配置し、暗号化を有効にして保護</li>
            </ul>
            <p class="text-paragraph" style="margin-top: 20px;">
              次の章では、オブジェクトストレージ<strong>S3（Simple Storage Service）</strong>を学びます。
            </p>
          </div>

          <div class="point-box" style="margin-top: 30px;">
            <div class="point-box-title">&#128214; AWS公式ドキュメント参照先</div>
            <ul class="feature-list">
              <li><a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html" target="_blank" rel="noopener">Amazon RDSとは（User Guide）</a> / <a href="https://aws.amazon.com/rds/pricing/" target="_blank" rel="noopener">RDS料金</a></li>
              <li><a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.DBInstanceClass.html" target="_blank" rel="noopener">DBインスタンスクラス</a></li>
              <li><a href="https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html" target="_blank" rel="noopener">Amazon Auroraとは</a></li>
              <li><a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html" target="_blank" rel="noopener">マルチAZ配置</a> / <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html" target="_blank" rel="noopener">リードレプリカ</a></li>
              <li><a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.html" target="_blank" rel="noopener">RDSのセキュリティ</a> / <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html" target="_blank" rel="noopener">暗号化</a></li>
              <li><a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html" target="_blank" rel="noopener">自動バックアップ</a> / <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIT.html" target="_blank" rel="noopener">ポイントインタイムリカバリ</a></li>
              <li><a href="https://aws.amazon.com/rds/features/" target="_blank" rel="noopener">RDSの機能一覧</a></li>
            </ul>
          </div>
        </div>
      `
    },
    // セクション: 理解度テスト
    {
      id: "5-quiz",
      title: "第5章 理解度テスト",
      type: "quiz",
      questions: [
        {
          question: "RDS（Relational Database Service）の特徴として正しいものはどれですか？",
          options: [
            { label: "A", text: "データベースソフトウェアを自分でインストールする必要がある" },
            { label: "B", text: "フルマネージド型でバックアップやパッチ適用が自動化されている" },
            { label: "C", text: "NoSQLデータベース専用のサービス" },
            { label: "D", text: "オンプレミス環境でのみ利用可能" }
          ],
          correct: 1,
          explanation: {
            correct: "正解です！RDSはフルマネージド型のリレーショナルデータベースサービスで、バックアップやパッチ適用が自動化されています。開発者はアプリケーション開発に集中できます。",
            incorrect: "不正解です。RDSはフルマネージド型サービスで、データベースのセットアップ、パッチ適用、バックアップなどの運用タスクをAWSが自動で行います。"
          }
        },
        {
          question: "RDSで利用できないDBエンジンはどれですか？",
          options: [
            { label: "A", text: "MySQL" },
            { label: "B", text: "PostgreSQL" },
            { label: "C", text: "MongoDB" },
            { label: "D", text: "Amazon Aurora" }
          ],
          correct: 2,
          explanation: {
            correct: "正解です！MongoDBはNoSQLデータベースであり、RDSでは利用できません。MongoDBを使用する場合は、Amazon DocumentDB（MongoDB互換）を使用します。",
            incorrect: "不正解です。RDSはリレーショナルデータベースサービスで、MySQL、PostgreSQL、MariaDB、Oracle、SQL Server、IBM Db2、Amazon Auroraに対応しています。MongoDBはNoSQLのため対象外です。"
          }
        },
        {
          question: "マルチAZ配置の主な目的はどれですか？",
          options: [
            { label: "A", text: "高可用性を実現し、障害時に自動でフェイルオーバーする" },
            { label: "B", text: "読み取り性能を向上させる" },
            { label: "C", text: "データベースのコストを削減する" },
            { label: "D", text: "データベースの暗号化を有効にする" }
          ],
          correct: 0,
          explanation: {
            correct: "正解です！マルチAZ配置の主な目的は高可用性の実現です。プライマリDBに障害が発生すると、自動的にスタンバイDBに切り替わり（フェイルオーバー）、サービスを継続できます。",
            incorrect: "不正解です。マルチAZ配置の主な目的は高可用性の実現です。読み取り性能の向上にはリードレプリカを使用します。"
          }
        },
        {
          question: "リードレプリカの説明として正しいものはどれですか？",
          options: [
            { label: "A", text: "障害時に自動でフェイルオーバーするスタンバイDB" },
            { label: "B", text: "プライマリDBの読み取り専用のコピーで、読み取り処理を分散できる" },
            { label: "C", text: "データベースのバックアップを保存する場所" },
            { label: "D", text: "データベースの暗号化キーを管理するサービス" }
          ],
          correct: 1,
          explanation: {
            correct: "正解です！リードレプリカはプライマリDBの読み取り専用のコピーです。読み取り処理をリードレプリカに分散することで、読み取り性能を向上できます。",
            incorrect: "不正解です。リードレプリカはプライマリDBの読み取り専用のコピーで、読み取り性能の向上が目的です。自動フェイルオーバーはマルチAZ配置の機能です。"
          }
        },
        {
          question: "RDSのセキュリティベストプラクティスとして正しいものはどれですか？",
          options: [
            { label: "A", text: "パブリックサブネットに配置してインターネットからアクセス可能にする" },
            { label: "B", text: "すべてのIPアドレスからのアクセスを許可する" },
            { label: "C", text: "プライベートサブネットに配置し、必要なアプリケーションからのみアクセスを許可する" },
            { label: "D", text: "暗号化は性能に影響するため無効にする" }
          ],
          correct: 2,
          explanation: {
            correct: "正解です！RDSはプライベートサブネットに配置し、セキュリティグループで必要なアプリケーションからのみアクセスを許可するのがベストプラクティスです。暗号化も有効にすることを推奨します。",
            incorrect: "不正解です。RDSはプライベートサブネットに配置し、インターネットからの直接アクセスを遮断するのがベストプラクティスです。セキュリティグループでアクセス元を制限しましょう。"
          }
        }
      ]
    }
  ]
};
