package main

import "net/http"
import "fmt"
import "flag"
import "log"

var port int
var host string
var path string

func init() {
	 const defaultPort = 8080
	 const defualtHost = "0.0.0.0"
	 const defaultDir  = "."

         flag.IntVar(&port, "p", 8080, "Port that this webserver should listen to. Default: 8080")
	 flag.StringVar(&host, "l", "0.0.0.0", "Default host for this webserver to listen to. Default: 0.0.0.0")
         flag.StringVar(&path, "d", "./", "The path to the directory this webserver should serve. Default: spawned directory")
}

func main() {
	flag.Parse()

	fmt.Printf("Starting webserver on  %s:%d and serving path %s\n", host, port, path)

	listen := fmt.Sprintf("%s:%d", host, port)

	log.Fatal(http.ListenAndServe(listen, Log(http.FileServer(http.Dir(path)))))
}

func Log(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s %s", r.RemoteAddr, r.Method, r.URL)
		handler.ServeHTTP(w, r)
	})
}
