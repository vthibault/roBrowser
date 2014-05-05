package main

import "net/http"
import "fmt"
import "flag"
import "log"

var port int
var path string

func init() {
         flag.IntVar(&port, "p", 8080, "Port that this webserver should listen to. Default: 8080")
         flag.StringVar(&path, "d", "./", "The path to the directory this webserver should serve. Default: spawned directory")
}

func main() {
	flag.Parse()

	fmt.Printf("Starting webserver on port %d and serving path %s\n", port, path)

	listen := fmt.Sprintf(":%d", port)

	log.Fatal(http.ListenAndServe(listen, Log(http.FileServer(http.Dir(path)))))
}

func Log(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s %s", r.RemoteAddr, r.Method, r.URL)
		handler.ServeHTTP(w, r)
	})
}
