// JavaSocketBridge.java
// by Stephen Ware
// April 25, 2009
//
// Part of the JavaSocketBridge project.
// This applet provides an interface for using true sockets in JavaScript.
//
// Note: You will need to have the Java Plugin archive in your classpath to compile this.
//       For me, that's C:\Program Files\Java\jre6\lib\plugin.jar
// Note: You will need to jar this class and Listener.class into a signed jar file if
//       you want your sockets to access domains other than the one this is running on.
// Note: Apparently, when you grant permissions to Java applets in Java 6, you only grant
//       them to the main applet thread.  That's the reason for all the confusing stuff
//       in the connect methods... so that connections always happen on the main thread.
//
// Modify by Thibault Vincent for roBrowser project

import java.applet.*;
import javax.swing.*;
import netscape.javascript.*;
import java.net.*;
import java.io.*;

public class JavaSocketBridge extends JApplet {

	JSObject _window             = null;
	Socket _socket               = null;
	BufferedOutputStream _writer = null;
	SocketListener _listener     = null;

	boolean _running             = false;

	// Server parameter
	String _host  = null;
	int _port     =   -1;
	int _id       =   -1;



	// Destroy
	public void destroy() {
		disconnect();
	}


	// Main
	public void start() {

		// Since JAVA triggered start() when changing tab, we don't want multiple instance running...
		if( _running )
			return;

		_running = true;
		_id      = Integer.parseInt(this.getParameter("id"));
		_window  = JSObject.getWindow(this);

		_window.call("javasocketbridge_onready", new Object[] {_id} );

		while( _running ) {
			try {
				Thread.sleep(100);
			}
			catch( Exception ex ){
				_running = false;
				break;
			}

			// Connect
			if( _host != null && _port != -1 && _socket == null ) {
				_connect( _host, _port );
				break;
			}
		}
	}



	// JAVA Connect	private
	private void _connect(String host, int port) {
		boolean success = true;

		// Try to connect
		try {
			_socket   = new Socket(host, port);
			_writer   = new BufferedOutputStream(_socket.getOutputStream());
			_listener = new SocketListener(_socket, this);
			_listener.start();
		}
		catch(Exception ex){
			success = false;
		}

		_window.call("javasocketbridge_oncomplete", new Object[] {_id, success} );
	}



	// Javascript Connect
	public void connect(String host, int port) {
		_host = host;
		_port = port;
	}



	// Javascript Send a message
	public void send(String hex){
		if( _writer == null )
			return;

		try {
			int i, count = hex.length();
			for( i = 0; i<count; i+=2 ) {
				_writer.write(
					Integer.parseInt(
						hex.substring(i, i+2), 16
					)
				);
			}
			_writer.flush();
		}
		catch( Exception ex ){}
	}



	// Javascript Disconnect
	public void disconnect() {
		try {
			if( _running ) {
				_listener.close();
				_writer.close();
			}
			_writer   = null;
			_listener = null;
			_socket   = null;
			_host     = null;
			_port     =   -1;
		}
		catch(Exception ex) {}

		_running = false;
	}



	// JAVA Disconnect
	public void onclose() {
		_running = false;
		disconnect();
		_window.call("javasocketbridge_onclose", new Object[] {_id} );
	}



	// Send message to javascript
	public void onmessage( String hex ) {
		_window.call("javasocketbridge_onmessage", new Object[] {_id, hex} );
	}
}