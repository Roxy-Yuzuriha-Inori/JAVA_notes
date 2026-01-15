# 文件流
## 创建文件
```java
//方法一：new File(完整路径)
File file = new File("/path/to/file");
//方法二：父目录文件+子路径
File parentFile = new File("/path/to/");
String fileName = "file";
File file = new File(parentFile,fileName);
//方法三：父路径+子路径
String parentName = "/path/to/file";
String childName = "file";
File file = new File(parentName,childName);
if (file.createNewFile()) {
    // 文件创建成功:
    // TODO:
    if (file.delete()) {
        // 删除文件成功:
    }
}
```
## 文件方法
```java
// 调用相应的方法，得到对应信息
System.out.println("文件名字=" + file.getName());
// getName、getAbsolutePath、getParent、length、exists、isFile、isDirectory
System.out.println("文件绝对路径=" + file.getAbsolutePath());
System.out.println("文件父级目录=" + file.getParent());
System.out.println("文件大小(字节)=" + file.length());
System.out.println("文件是否存在=" + file.exists());//T
System.out.println("是不是一个文件=" + file.isFile());//T
System.out.println("是不是一个目录=" + file.isDirectory());//F
```
# 流分类
1. 按操作数据单位不同分为:
字节流 (8 bit) - 二进制文件
字符流 (按字符) - 文本文件
2. 按数据流的流向不同分为:
输入流
输出流
3. 按流的角色的不同分为:
节点流
处理流 / 包装流
```
(抽象基类)  	字节流      	字符流
 输入流	    InputStream  	 Reader
 输出流	    OutputStream	 Writer
```
## FileInputStream
节输入流，文件——>程序
```java
@Test
public void readFile02() {
    String filePath = "e:\\hello.txt";
    int readData = 0;
    //字节数组
    byte[] buf = new byte[8]; //一次读取8个字节。
    int readLen = 0;
    FileInputStream fileInputStream = null;
    try {
        //创建 FileInputStream 对象,用于读取文件
        fileInputStream = new FileInputStream(filePath);
        //从该输入流读取最多b.length字节的数据到字节数组。此方法将阻塞,直到某些输入可
        //如果返回-1,表示读取完毕
        //如果读取正常,返回实际读取的字节数
        while ((readLen = fileInputStream.read(buf)) != -1) {
            System.out.print(new String(buf, 0, readLen)); //显示
        }
    } finally {
        //关闭文件流,释放资源.
        try {
            fileInputStream.close(); // fileInputStream: FileInputStream@1485 (此部分为调试信息，非代码)
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
## FileOutputStream
将数据写入文件中
```java
//new的时候后面加true则不会覆盖原先的内容（上次写入）
fileOutputStream = new FileOutputStream(filePath, true);
try {
    //得到 FileOutputStream对象对象
    //new的时候后面加true则不会覆盖原先的内容（上次写入）
    FileOutputStream fileOutputStream = new FileOutputStream(filePath, true);
    //写入一个字节
    //fileOutputStream.write('H');//
    //写入字符串
    String str = "hello, world!";
    //str.getBytes() 可以把字符串-> 字节数组
    fileOutputStream.write(str.getBytes());
    //write(byte[] b, int off, int len) 将 len字节从位于偏移量 off的指定字节数组
    fileOutputStream.write(str.getBytes(), 0, str.length());
}

//文件拷贝
public static void main(String[] args) {
    //完成 文件拷贝, 将 e:\\Koala.jpg 拷贝 c:\\
    //思路分析
    //1.创建文件的输入流,将文件读入到程序
    //2.创建文件的输出流,将读取到的文件数据,写入到指定的文件.
    String srcFilePath = "e:\\Koala.jpg";
    String destFilePath = "e:\\Koala2.jpg";
    FileInputStream fileInputStream = null;
    FileOutputStream fileOutputStream = null;
    
    try {
        fileInputStream = new FileInputStream(srcFilePath);
        fileOutputStream = new FileOutputStream(destFilePath);
        //定义一个字节数组,提高读取效果
        byte[] buf = new byte[1024];
        int readLen = 0;
        while ((readLen = fileInputStream.read(buf)) != -1) {
            //读取到后,就写入到文件通过 fileOutputStream
            //即,是一边读,一边写
            fileOutputStream.write(buf);//一定要使用这个方法
        }
        System.out.println("拷贝ok~");
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        if(fileInputStream != null) {
            fileInputStream.close();
        }
    }
}
```

## 字符流FileReader和FileWriter
### FileReader
1. new FileReader(File/String): 构造函数，可以接受File对象或String路径
2. read:每次读取单个字符,返回该字符,如果到文件末尾返回-1
3. read(char[]):批量读取多个字符到数组,返回读取到的字符数,如果到文件末尾返回-1
相关API:
new String(char[]):将char[]转换成String
new String(char[], off,len):将char[]的指定部分转换成String
```java
import java.io.FileReader;
import java.io.IOException;

public class FileReaderDemo {
    public static void main(String[] args ) {
        String filePath = "test.txt";
        FileReader fileReader = null;
        
        try {
            // 创建FileReader对象
            fileReader = new FileReader(filePath);
            
            // 方法1：逐个字符读取
            System.out.println("=== 逐个字符读取 ===");
            int data;
            while ((data = fileReader.read()) != -1) {
                System.out.print((char) data);
            }
            System.out.println();
            
            // 重新创建FileReader（因为已经读到末尾）
            fileReader.close();
            fileReader = new FileReader(filePath);
            
            // 方法2：批量读取
            System.out.println("\n=== 批量读取 ===");
            char[] buffer = new char[8];
            int readLen;
            while ((readLen = fileReader.read(buffer)) != -1) {
                System.out.print(new String(buffer, 0, readLen));
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fileReader != null) {
                    fileReader.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```
### FileWriter
1. new FileWriter(File/String): 覆盖模式,相当于流的指针在首端
2. new FileWriter(File/String, true): 追加模式,相当于流的指针在尾端
3. write(int): 写入单个字符
4. write(char[]): 写入指定数组
5. write(char[], off,len): 写入指定数组的指定部分
6. write(string): 写入整个字符串
7. write(string, off,len): 写入字符串的指定部分
相关API:
String类: toCharArray:将String转换成char[]

* 注意:FileWriter使用后,必须要关闭(close)或刷新(flush),否则写入不到指定的文件!

```java
import java.io.FileWriter;
import java.io.IOException;

public class FileWriterDemo {
    public static void main(String[] args) {
        String filePath = "output.txt";
        FileWriter fileWriter = null;
        
        try {
            // 覆盖模式写入
            fileWriter = new FileWriter(filePath);
            
            // 写入单个字符
            fileWriter.write('H');
            fileWriter.write('e');
            fileWriter.write('l');
            fileWriter.write('l');
            fileWriter.write('o');
            
            // 写入字符数组
            char[] chars = {' ', 'W', 'o', 'r', 'l', 'd', '!'};
            fileWriter.write(chars);
            
            // 写入字符数组的指定部分
            char[] moreChars = {'J', 'a', 'v', 'a', 'I', 'O'};
            fileWriter.write(moreChars, 0, 4); // 只写入"Java"
            
            // 写入字符串
            fileWriter.write(" 编程学习");
            
            // 写入字符串的指定部分
            String str = "Hello World Java IO";
            fileWriter.write(str, 6, 5); // 只写入"World"
            
            System.out.println("文件写入完成！");
            
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fileWriter != null) {
                    fileWriter.close(); // 必须关闭或刷新
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```
## 节点流与处理流
### 节点流
从一个特定的数据源读取数据 比如：FileReader和FileWriter
### 处理流（包装流）
在已存在的流（节点流或处理流）之上，为程序提供更强大的功能  比如：BufferedReader和BufferedWriter
#### BufferedReader
```java
String filePath = "e:\\a.java";
//创建bufferedReader
BufferedReader bufferedReader = new BufferedReader(new FileReader(filePath));
//读取
String line; //按行读取,效率高
//说明
//1. bufferedReader.readLine() 是按行读取文件
//2.当返回null时,表示文件读取完毕
while ((line = bufferedReader.readLine()) != null) {
    System.out.println(line);
}
//关闭流,这里注意,只需要关闭 BufferedReader,因为底层会自动的去关闭节点流
//FileReader.
bufferedReader.close();
```
#### BufferedWriter
```java
public class BufferedWriter_ {
    public static void main(String[] args) throws IOException {
        String filePath = "e:\\ok.txt";
        //创建BufferedWriter
        //说明:
        //1. new FileWriter(filePath, true)表示以追加的方式写入
        //2. new FileWriter(filePath),表示以覆盖的方式写入
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(filePath, true));
        //说明:关闭外层流即可,传入的 new FileWriter (filePath),会在底层关闭
        bufferedWriter.write("hello,韩顺平教育!");
        bufferedWriter.newLine();
        bufferedWriter.close();
    }
}

```
```java
//文件拷贝
//1. BufferedReader 和 BufferedWriter 是安装字符操作
//2. 不要去操作 二进制文件,可能造成文件损坏
String srcFilePath = "e:\\a.java";
String destFilePath = "e:\\a2.java";
BufferedReader br = null;
BufferedWriter bw = null;
String line;

try {
    br = new BufferedReader(new FileReader(srcFilePath));
    bw = new BufferedWriter(new FileWriter(destFilePath));
    //说明: readLine 读取一行内容,但是没有换行
    while ((line = br.readLine()) != null) {
        //每读取一行,就写入
        bw.write(line);
        //插入一个换行
        bw.newLine();
    }
}
```
## 对象流
1. 问题：
将 int num = 100 这个 int 类型的数据保存到文件中，注意不是100数字，而是int 100，并且能够直接从文件中恢复出 int 100。将 Dog dog = new Dog("小黄",3) 这个 Dog 对象保存到文件中，并且能够从文件中恢复出这个 Dog 对象。
2. 解决：序列化和反序列化
序列化：就是在保存数据时，保存数据的值和数据类型。序列化，文件后缀是dat
反序列化：就是在恢复数据时，恢复数据的值和数据类型
为了让某个对象支持序列化机制，则必须让其类是可序列化的。
3. 实现：
为了让某个类是可序列化的，该类必须实现如下两个接口之一：
Serializable：这是一个标记接口，没有需要实现的方法
Externalizable：该接口有方法需要实现，因此我们一般实现上面的Serializable
```java
//序列化
/**
 * 演示ObjectOutputStream的使用,完成数据的序列化
 */
public class ObjectOutStream_ {
    public static void main(String[] args) throws Exception {
        //序列化后,保存的文件格式,不是存文本,而是按照他的格式来保存
        //序列化数据到 e:\data.dat
        String filePath = "e:\\data.dat";
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filePath));
        oos.write(100);// int -> Integer(实现了 Serializable)
        oos.writeBoolean(true); // boolean -> Boolean (实现了 Serializable)
        oos.writeChar('a'); // char -> Character (实现了 Serializable)
        oos.writeDouble(9.5); // double -> Double (实现了 Serializable)
        oos.writeUTF("韩顺平教育"); //String
        //保存一个dog对象
        oos.writeObject(new Dog("旺财", 10));
        oos.close();
        System.out.println("数据保存完毕(序列化形式)");
    }
}
        //如果需要序列化某个类的对象,必须实现 Serializable
        class Dog implements Serializable {
            private String name;
}


//反序列化的顺序要与序列化顺序一致
System.out.println(ois.readInt());
System.out.println(ois.readBoolean());
System.out.println(ois.readChar());
System.out.println(ois.readDouble());
System.out.println(ois.readUTF());
Object dog = ois.readObject();
System.out.println("运行类型=" + dog.getClass());
System.out.println("dog信息=" + dog); //底层 Object -> Dog
```

### 对象序列化规则
Java 对象序列化规则
1. 读写顺序要一致
2. 要求序列化或反序列化对象，需要实现 Serializable
3. 序列化的类中建议添加 SerialVersionUID，为了提高版本的兼容性
4. 序列化对象时，默认将里面所有属性都进行序列化，但除了 static 或 transient 修饰的成员
5. 序列化对象时，要求里面属性的类型也需要实现序列化接口
6. 序列化具备可继承性，也就是如果某类已经实现了序列化，则它的所有子类也已经默认实现了序列化

## 标准输入输出流
### 标准输入
编译类型：InputStream（声明时的类型）
运行类型：BufferedInputStream（实际运行时的类型）
作用：代表标准输入设备（键盘）
### 标准输出
编译类型：PrintStream
运行类型：PrintStream（编译类型和运行类型相同）
作用：代表标准输出设备（显示器/控制台）

## 转换流
问题：要用字符流，但字符流编码不一致
解决：传入字节流，转成字符流，并指定编码来读取，比如传入InputStream对象并指定处理的编码
```java
//以指定的编码读取和写入文件
import java.io.*;

public class CharacterStreamDemo {
    public static void main(String[] args) {
        // 1. 使用OutputStreamWriter写入文件（UTF-8编码）
        writeFileWithUTF8();
        
        // 2. 使用InputStreamReader读取文件（GBK编码）
        readFileWithGBK();
        
        // 3. 编码转换示例
        convertEncoding();
    }
    
    // 写入文件（UTF-8编码）
    public static void writeFileWithUTF8() {
        String filePath = "test_utf8.txt";
        String content = "Hello, 世界! 这是UTF-8编码的文本。";
        
        try (OutputStreamWriter writer = new OutputStreamWriter(
                new FileOutputStream(filePath), "UTF-8")) {
            writer.write(content);
            System.out.println("UTF-8文件写入成功: " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    // 读取文件（GBK编码）
    public static void readFileWithGBK() {
        String filePath = "test_gbk.txt";
        
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(new FileInputStream(filePath), "GBK"))) {
            
            String line;
            System.out.println("GBK文件内容:");
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    // 编码转换示例
    public static void convertEncoding() {
        String inputFile = "input_utf8.txt";
        String outputFile = "output_gbk.txt";
        
        try {
            // 创建输入文件（UTF-8）
            try (OutputStreamWriter writer = new OutputStreamWriter(
                    new FileOutputStream(inputFile), "UTF-8")) {
                writer.write("这是UTF-8编码的原始文件");
            }
            
            // 读取UTF-8文件，转换为GBK写入新文件
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(new FileInputStream(inputFile), "UTF-8"));
                 OutputStreamWriter writer = new OutputStreamWriter(
                    new FileOutputStream(outputFile), "GBK")) {
                
                String line;
                while ((line = reader.readLine()) != null) {
                    writer.write(line);
                    writer.write("\n");
                }
            }
            
            System.out.println("编码转换完成: UTF-8 -> GBK");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## 配置文件处理
```java
import java.io.*;
import java.util.Properties;

public class PropertiesDemo {
    public static void main(String[] args) {
        // 1. 创建配置文件
        createPropertiesFile();
        
        // 2. 读取配置文件
        readPropertiesFile();
        
        // 3. 修改配置文件
        modifyPropertiesFile();
    }
    
    // 创建配置文件
    public static void createPropertiesFile() {
        try {
            Properties properties = new Properties();
            
            // 设置数据库配置
            properties.setProperty("db.driver", "com.mysql.cj.jdbc.Driver");
            properties.setProperty("db.url", "jdbc:mysql://localhost:3306/testdb");
            properties.setProperty("db.username", "root");
            properties.setProperty("db.password", "123456");
            properties.setProperty("db.charset", "utf8");
            
            // 设置应用配置
            properties.setProperty("app.name", "我的应用");
            properties.setProperty("app.version", "1.0.0");
            properties.setProperty("app.debug", "true");
            
            // 保存到文件
            try (FileOutputStream fos = new FileOutputStream("config.properties")) {
                properties.store(fos, "应用程序配置文件");
                System.out.println("配置文件创建成功！");
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    // 读取配置文件
    public static void readPropertiesFile() {
        try (FileInputStream fis = new FileInputStream("config.properties")) {
            Properties properties = new Properties();
            properties.load(fis);
            
            System.out.println("\n=== 配置文件内容 ===");
            properties.list(System.out);
            
            System.out.println("\n=== 特定配置项 ===");
            System.out.println("数据库URL: " + properties.getProperty("db.url"));
            System.out.println("应用名称: " + properties.getProperty("app.name"));
            System.out.println("调试模式: " + properties.getProperty("app.debug"));
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    // 修改配置文件
    public static void modifyPropertiesFile() {
        try {
            Properties properties = new Properties();
            
            // 先加载现有配置
            try (FileInputStream fis = new FileInputStream("config.properties")) {
                properties.load(fis);
            }
            
            // 修改配置
            properties.setProperty("app.version", "1.1.0");
            properties.setProperty("app.debug", "false");
            properties.setProperty("db.password", "newpassword");
            
            // 保存修改后的配置
            try (FileOutputStream fos = new FileOutputStream("config.properties")) {
                properties.store(fos, "修改后的应用程序配置文件");
                System.out.println("\n配置文件修改成功！");
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
