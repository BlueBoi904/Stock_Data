package commons

import (
	"context"
	"time"

	"github.com/go-kit/kit/log"
)

type Loggable interface {
	log() basicLog
}

type basicLog struct {
	Key   string
	Value interface{}
}

//Middleware Defines a middleware service
type Middleware func(Service) Service

//ServiceLogging I think this works too
func ServiceLogging(s Service, logger log.Logger) Service {
	var next Service
	next = LoggingMiddleware(logger)(s)
	return next
}

//LoggingMiddleware I think this works
func LoggingMiddleware(logger log.Logger) Middleware {
	return func(next Service) Service {
		return &loggingMiddleware{
			next:   next,
			logger: logger,
		}
	}
}

type loggingMiddleware struct {
	next   Service
	logger log.Logger
}

func (lm loggingMiddleware) Execute(ctx context.Context, req interface{}) (r interface{}, err error) {
	defer func(begin time.Time) {
		baseLogs := []interface{}{
			"method", req.(Endpoint).Info().Path,
			"Request", req,
			"Response", r,
			"err", err,
		}
		lm.logger.Log(baseLogs...)
	}(time.Now())

	return lm.next.Execute(ctx, req)
}

func (lm loggingMiddleware) Log() string {
	return "Logging Middle Ware"
}
