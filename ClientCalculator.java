import java.io.*;
import java.net.*;
import java.util.Scanner;

public class ClientCalculator {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket("localhost", 7000);
        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);

        Scanner sc = new Scanner(System.in);
        System.out.println("Enter expressions (e.g. 'sin 45' or '2 + 3'). Type 'exit' to quit.");

        while(true) {
            System.out.print("> ");
            String input = sc.nextLine();
            if (input.equalsIgnoreCase("exit")) break;

            out.println(input);
            String response = in.readLine();
            System.out.println(response);
        }

        socket.close();
        sc.close();
    }
}
