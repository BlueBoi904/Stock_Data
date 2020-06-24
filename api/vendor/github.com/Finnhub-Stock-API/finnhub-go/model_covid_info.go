/*
 * Finnhub API
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * API version: 1.0.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package finnhub
import (
	"time"
)
// CovidInfo struct for CovidInfo
type CovidInfo struct {
	// State.
	State string `json:"state,omitempty"`
	// Number of confirmed cases.
	Case float32 `json:"case,omitempty"`
	// Number of confirmed deaths.
	Death float32 `json:"death,omitempty"`
	// Updated time.
	Updated time.Time `json:"updated,omitempty"`
}
