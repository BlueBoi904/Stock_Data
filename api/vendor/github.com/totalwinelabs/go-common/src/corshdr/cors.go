package corshdr

import (
	"context"
	"net/http"
	"net/url"
	"strings"
)

type Key string

func GetReferer(ctx context.Context, r *http.Request) context.Context {
	ctx = context.WithValue(ctx, Key("referer"), r.Header.Get("referer"))
	return ctx
}

func SetCORS(ctx context.Context, w http.ResponseWriter) context.Context {
	r := ctx.Value(Key("referer")).(string)
	u, err := url.Parse(r)

	if err == nil && shouldAllow(u.Hostname()) {
		o := u.Scheme + "://" + u.Host
		w.Header().Set("Access-Control-Allow-Origin", o)
		w.Header().Set("Access-Control-Allow-Methods", "GET,OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type")
	}
	return ctx
}

func AllowOriginFunc(origin string) bool {
	u, _ := url.Parse(origin)
	return shouldAllow(u.Hostname())
}
func shouldAllow(host string) bool {
	if strings.HasSuffix(host, ".totalwine.com") {
		return true
	}
	if strings.HasSuffix(host, ".twmlabs.com") {
		return true
	}
	if host == "localhost" {
		return true
	}
	return false
}
