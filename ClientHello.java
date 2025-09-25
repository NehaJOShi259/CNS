import java.io.*;
import java.net.*;

public class ClientHello {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket("localhost", 5000);

        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

        out.println("Hello from Client!");

        String messageFromServer = in.readLine();
        System.out.println("Server says: " + messageFromServer);

        socket.close();
    }
}
