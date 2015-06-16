// SocketListener.java
// by Stephen Ware
// April 25, 2009
//
// Part of the JavaSocketBridge project.
// This class listens for input from a given socket.
//
// Modify by Thibault Vincent for roBrowser project

import java.io.*;
import java.net.*;
import java.util.Arrays;

// Thread that listens for input
public class SocketListener extends Thread {

	JavaSocketBridge _parent;
	Socket _socket;

	boolean _running    = false;
	int MAX_PACKET_SIZE = 16*1024;


	// Constructor
	public SocketListener(Socket socket, JavaSocketBridge parent) throws IOException{
		_socket = socket;
		_parent = parent;
	}


	// Close
	public void close() throws IOException{
		if( _running  ) {
			_running = false;
			_socket.close();
		}
	}



	// Main loop
	public void run() {
		_running            = true;
		byte[] bytes        = new byte[MAX_PACKET_SIZE];
		int size;

		while( _running ) {
			try {
				size = _socket.getInputStream().read(bytes, 0 , MAX_PACKET_SIZE);

				// Empty packet, close ?
				if ( size <= 0 )
					break;

				_parent.onmessage(  bin2hex(bytes, size) );
			}
			catch( Exception ex ) {
				break;
			}
		}

		// Disconnect, close.
		try{
			_parent.onclose();
		} catch(Exception ex){}
	}



	// Convert a byte array to hex string
	private String bin2hex(byte[] bytes, int size) {
		StringBuilder out = new StringBuilder();
		for( int i=0; i<size; i++ ) { 
			out.append(String.format("%02X", bytes[i]));
		}
		return out.toString(); 
	}
}