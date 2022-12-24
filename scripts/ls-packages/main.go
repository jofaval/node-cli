package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path"
)

// You could also execute go-lang scripts from a node project

type PackageJson struct {
	Name            string            `json:"name"`
	Version         string            `json:"version"`
	Description     string            `json:"description"`
	Type            string            `json:"type"`
	Scripts         map[string]string `json:"scripts"`
	Keywords        []string          `json:"keywords"`
	Author          string            `json:"author"`
	License         string            `json:"license"`
	Dependencies    map[string]string `json:"dependencies"`
	DevDependencies map[string]string `json:"devDependencies"`
}

func readJson(filepath string) PackageJson {
	fileContent, err := os.Open(filepath)
	if err != nil {
		panic(err)
	}

	defer fileContent.Close()

	byteResult, _ := ioutil.ReadAll(fileContent)

	var details PackageJson
	json.Unmarshal(byteResult, &details)

	return details
}

func main() {
	workingDirectory, err := os.Getwd()
	if err != nil {
		fmt.Println(err)
	}

	packageJsonPath := path.Join(workingDirectory, "package.json")
	details := readJson(packageJsonPath)

	fmt.Println("Dependencies:")
	for key, version := range details.Dependencies {
		fmt.Println("-", key, version)
	}

	fmt.Println()
	fmt.Println("Dev dependencies:")
	for key, version := range details.DevDependencies {
		fmt.Println("-", key, version)
	}
}
