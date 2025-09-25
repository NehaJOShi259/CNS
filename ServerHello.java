import java.io.*;
import java.net.*;

public class ServerHello {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(5000);
        System.out.println("Server started, waiting for client...");
        Socket socket = serverSocket.accept();
        System.out.println("Client connected.");

        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);

        String messageFromClient = in.readLine();
        System.out.println("Client says: " + messageFromClient);

        out.println("Hello from Server!");

        socket.close();
        serverSocket.close();
    }
}
