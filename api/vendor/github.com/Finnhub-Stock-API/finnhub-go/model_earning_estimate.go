/*
 * Finnhub API
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * API version: 1.0.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package finnhub
// EarningEstimate struct for EarningEstimate
type EarningEstimate struct {
	// Average EPS estimates.
	EpsAvg float32 `json:"epsAvg,omitempty"`
	// Highest estimate.
	EpsHigh float32 `json:"epsHigh,omitempty"`
	// Lowest estimate.
	EpsLow float32 `json:"epsLow,omitempty"`
	// Number of Analysts.
	NumberAnalysts int64 `json:"numberAnalysts,omitempty"`
	// Period.
	Period string `json:"period,omitempty"`
}
