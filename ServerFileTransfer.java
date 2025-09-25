import java.io.*;
import java.net.*;

public class ServerFileTransfer {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(6000);
        System.out.println("Server waiting for file...");

        Socket socket = serverSocket.accept();
        System.out.println("Client connected.");

        DataInputStream dis = new DataInputStream(socket.getInputStream());
        FileOutputStream fos = new FileOutputStream("received_file");

        byte[] buffer = new byte[4096];
        int filesize = dis.readInt(); // Read filesize
        int read = 0;
        int totalRead = 0;
        int remaining = filesize;

        while((read = dis.read(buffer, 0, Math.min(buffer.length, remaining))) > 0) {
            totalRead += read;
            remaining -= read;
            fos.write(buffer, 0, read);
        }

        System.out.println("File received successfully.");
        fos.close();
        dis.close();
        socket.close();
        serverSocket.close();
    }
}
