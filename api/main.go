package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Stock_Data/api/conf"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
}

func main() {

	config := conf.Initialize("./conf")
	apiKey := config.GetString("apiKey")

	fmt.Printf("Api Key:%v", apiKey)

	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
