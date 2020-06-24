package main

import (
	"context"
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/Stock_Data/api/commons"
	"github.com/Stock_Data/api/conf"
	"github.com/Stock_Data/api/services"
	"github.com/go-kit/kit/log"
)

func handleRequests() {

	ctx := context.Background()
	config := conf.Initialize("./conf")

	handlers := []commons.ServiceEndpoint{
		{
			Endpoint: new(services.GetQuoteRequest),
			Service:  new(services.GetQuoteService),
		},
	}

	var (
		httpAddr = flag.String("http.addr", ":8080", "HTTP listen address")
	)
	flag.Parse()

	var logger log.Logger
	{
		logger = log.NewJSONLogger(log.NewSyncWriter(os.Stderr))
	}

	h := commons.GenerateHandlers(ctx, handlers, config, logger)

	errs := make(chan error)
	go func() {
		c := make(chan os.Signal)
		signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
		errs <- fmt.Errorf("%s", <-c)
	}()

	go func() {
		logger.Log("transport", "HTTP", "addr", *httpAddr)
		errs <- http.ListenAndServe(":8080", h)
	}()

	logger.Log("exit", <-errs)
}

func main() {
	handleRequests()
}
