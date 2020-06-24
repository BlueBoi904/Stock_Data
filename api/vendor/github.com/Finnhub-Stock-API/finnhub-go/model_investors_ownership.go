/*
 * Finnhub API
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * API version: 1.0.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package finnhub
// InvestorsOwnership struct for InvestorsOwnership
type InvestorsOwnership struct {
	// Symbol of the company.
	Symbol string `json:"symbol,omitempty"`
	// Array of investors with detailed information about their holdings.
	Ownership []map[string]interface{} `json:"ownership,omitempty"`
}
