<?php
/**
 * pdo-DB Operations Common Lib
 * May 17, by Kevin @ I.G.A
 * 
 **/

final class DB {
	
	private static $instance = null;
	// 定义默认数据库主机名
	public static $dbhost = '210.14.79.122';
	//public static $dbhost2 = '210.51.48.252';
	// 定义默认数据库主机端口
	public static $dbport = 3306;
	// 定义默认数据库名
	public static $dbname = 'luxgen';
	// 定义默认数据库用户名
	public static $dbuser = 'client_campaigns';
	// 定义默认数据库密码
	public static $dbpass = 'r$P?X5C[4^:17biXOc';
	//
	public static $stmt = null;
	// 数据库查询次数
	//public static $querycount = 0;
	//
	public static $DB = null;
	// 数据库版本
	public static $version = 0;
	// 是否调试模式
	public static $debug = 0;
	
	public function __construct() {
		self::connect ();
	}
	
	// getInstance
	public static function getInstance() {
		if (self::$instance == null) {
			self::$instance = new DB ();
		}
		return self::$instance;
	}
	
	/**
	 * ******************************************
	 * 连接数据库
	 * *******************************************
	 */
	public function connect() {
		

		try{
		self::$DB = new PDO ( 'mysql:host=' . self::$dbhost . ';port=' . self::$dbport . ';dbname=' . self::$dbname, self::$dbuser, self::$dbpass, array (
				PDO::ATTR_PERSISTENT => false , PDO::ATTR_TIMEOUT => 1
		) );
		}
		catch (Exception $e)
		{
			try{
				self::$DB = new PDO ( 'mysql:host=' . self::$dbhost2 . ';port=' . self::$dbport . ';dbname=' . self::$dbname, self::$dbuser, self::$dbpass, array (
						PDO::ATTR_PERSISTENT => false, PDO::ATTR_TIMEOUT => 1
				) );
			}
			catch (Exception $e)
				{
				self::halt ( 'MySQL has gone.' );
				}
		}


	}
	
	/**
	 * ******************************************
	 * 获取数据库出错信息
	 * *******************************************
	 */
	public function getErrInfo() {
		if (self::getErrNo () != '00000') {
			$info = (self::$stmt) ? self::$stmt->errorInfo () : self::$DB->errorInfo ();
			self::halt ( $info [2] );
		}
	}
	
	/**
	 * ******************************************
	 * 获取数据库出错代号
	 * *******************************************
	 */
	function getErrNo() {
		if (self::$stmt) {
			return self::$stmt->errorCode ();
		} else {
			return self::$DB->errorCode ();
		}
	}
	
	/**
	 * ******************************************
	 * 输出数据库出错信息
	 * *******************************************
	 */
	private function halt($msg = '') {
		echo $msg;
		exit ();
	}
	
	/**
	 * ******************************************
	 * 获取当前库的所有表名
	 * 返回:当前库的所有表名
	 * 类型:数组
	 * *******************************************
	 */
	public function getTablesName() {
		self::$stmt = self::$DB->query ( 'SHOW TABLES FROM ' . self::$dbname );
		//self::getErrInfo ();
		$result = self::$stmt->fetchAll ( PDO::FETCH_NUM );
		self::$stmt = null;
		return $result;
	}
	
	/**
	 * ******************************************
	 * 获取数据表里的字段
	 * 返回:表字段结构
	 * 类型:数组
	 * *******************************************
	 */
	public function getFields($table) {
		self::$stmt = self::$DB->query ( "DESCRIBE $table" );
		//self::getErrInfo ();
		$result = self::$stmt->fetchAll ( PDO::FETCH_ASSOC );
		self::$stmt = null;
		return $result;
	}
	
	/**
	 * ******************************************
	 * 获取所有数据
	 * 返回:表内记录
	 * 类型:数组
	 * 参数:select * from table
	 * *******************************************
	 */
	public function select($sql, $type = PDO::FETCH_ASSOC) {
/* 		if (self::$debug) {
			echo $sql . '<br />';
		} */
		$result = array ();
		self::$stmt = self::$DB->query ( $sql );
		//self::getErrInfo ();
		//self::$querycount ++;
		$result = self::$stmt->fetchAll ( $type );
		self::$stmt = null;
		return $result;
	}
	
	/**
	 * ******************************************
	 * 获取单行数据
	 * 返回:表内记录
	 * 类型:数组
	 * 参数:select * from table where id='1'
	 * *******************************************
	 */
	public function select_row($sql, $type = PDO::FETCH_ASSOC) {
/* 		if (self::$debug) {
			echo $sql . '<br />';
		} */
		$result = array ();
		self::$stmt = self::$DB->query ( $sql );
		//self::getErrInfo ();
		//self::$querycount ++;
		$result = self::$stmt->fetch ( $type );
		self::$stmt = null;
		return $result;
	}
	
	/**
	 * ******************************************
	 * 获取记录总数
	 * 返回:记录数
	 * 类型:数字
	 * 参数:select count(*) from table
	 * *******************************************
	 */
	public function getRows($sql = '') {
		if ($sql) {
/* 			if (self::$debug) {
				echo $sql . '<br />';
			} */
/* 			self::$stmt = self::$DB->query ( $sql );
			//self::getErrInfo ();
			//self::$querycount ++;
			$result = self::$stmt->fetchColumn ();
			self::$stmt = null; */
			self::$stmt = self::$DB->prepare ( $sql );
			self::$stmt->execute();
			$result = self::$stmt->rowCount();
		} elseif (self::$stmt) {
			$result = self::$stmt->rowCount ();
		} else {
			$result = 0;
		}
		return $result;
	}
	
	/**
	 * ******************************************
	 * 获得最后INSERT的主键ID
	 * 返回:最后INSERT的主键ID
	 * 类型:数字
	 * *******************************************
	 */
	public function getLastId() {
		return self::$DB->lastInsertId(); 
	}
	
	/**
	 * ******************************************
	 * 执行INSERT\UPDATE\DELETE
	 * 返回:执行语句影响行数
	 * 类型:数字
	 * *******************************************
	 */
	public function Execute($sql) {
		$return = self::$DB->exec ( $sql );
		//self::getErrInfo ();
		//self::$querycount ++;
		return $return;
	}

	public function insert($sql) {
		self::Execute($sql);
		return self::getLastId();
	}
	
	public function update($sql) {
		return self::Execute($sql);
	}
	
	public function delete($sql) {
		return self::Execute($sql);
	}
	
	/**
	 * *****************************************
	 * 把原来编码的内容重新经过编码后输出
	 * ******************************************
	 */
	public function query($sql) {
		self::$DB->query ( $sql );
	}
	
	/**
	 * ******************************************
	 * 关闭数据连接
	 * *******************************************
	 */
	public function CloseDB() {
		self::$DB = null;
	}
}
?>