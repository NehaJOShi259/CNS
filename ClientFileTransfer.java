import java.io.*;
import java.net.*;

public class ClientFileTransfer {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket("localhost", 6000);
        File file = new File("file_to_send");

        DataOutputStream dos = new DataOutputStream(socket.getOutputStream());
        FileInputStream fis = new FileInputStream(file);

        dos.writeInt((int) file.length());

        byte[] buffer = new byte[4096];
        int read = 0;
        while((read = fis.read(buffer)) > 0) {
            dos.write(buffer, 0, read);
        }

        dos.flush();
        fis.close();
        dos.close();
        socket.close();
        System.out.println("File sent successfully.");
    }
}
