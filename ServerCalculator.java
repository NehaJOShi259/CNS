import java.io.*;
import java.net.*;

public class ServerCalculator {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(7000);
        System.out.println("Calculator Server started...");

        Socket socket = serverSocket.accept();
        System.out.println("Client connected.");

        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);

        String input;
        while ((input = in.readLine()) != null) {
            try {
                double result = calculate(input);
                out.println("Result: " + result);
            } catch (Exception e) {
                out.println("Error: " + e.getMessage());
            }
        }

        socket.close();
        serverSocket.close();
    }

    // Supports operations: +, -, *, /, sin, cos, tan, log, sqrt, pow
    public static double calculate(String expression) throws Exception {
        expression = expression.trim().toLowerCase();
        String[] parts = expression.split(" ");
        if (parts.length == 2) {
            // Unary operation, e.g., sin 45
            String op = parts[0];
            double val = Double.parseDouble(parts[1]);
            switch (op) {
                case "sin": return Math.sin(Math.toRadians(val));
                case "cos": return Math.cos(Math.toRadians(val));
                case "tan": return Math.tan(Math.toRadians(val));
                case "log": return Math.log10(val);
                case "sqrt": return Math.sqrt(val);
                default: throw new Exception("Unknown operation");
            }
        } else if (parts.length == 3) {
            // Binary operation, e.g., 2 + 3
            double a = Double.parseDouble(parts[0]);
            String op = parts[1];
            double b = Double.parseDouble(parts[2]);
            switch (op) {
                case "+": return a + b;
                case "-": return a - b;
                case "*": return a * b;
                case "/": 
                    if (b == 0) throw new Exception("Divide by zero");
                    return a / b;
                case "pow": return Math.pow(a, b);
                default: throw new Exception("Unknown operation");
            }
        } else {
            throw new Exception("Invalid expression");
        }
    }
}
