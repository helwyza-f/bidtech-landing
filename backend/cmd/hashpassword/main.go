// Command hashpassword prints a bcrypt hash for a given password, for use as ADMIN_PASSWORD_HASH.
//
// Usage: go run ./cmd/hashpassword "your-password"
package main

import (
	"fmt"
	"os"

	"bidtech-admin/internal/auth"
)

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintln(os.Stderr, "usage: hashpassword <password>")
		os.Exit(1)
	}

	hash, err := auth.HashPassword(os.Args[1])
	if err != nil {
		fmt.Fprintln(os.Stderr, "error:", err)
		os.Exit(1)
	}

	fmt.Println(hash)
}
