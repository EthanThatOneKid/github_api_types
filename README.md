# `github_api_types`

[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https://etok.codes/github_api_types/raw/main/mod.ts)

Type definitions for the [GitHub API](https://docs.github.com/en/rest).

## Development

### GitHub Workflows

This repository uses GitHub Workflows to automate some tasks.

#### `/.github/workflows/generate.yaml`

Nightly workflow that generates several files from the GitHub OpenAPI
specification.

##### Run manually

To run this workflow manually, go to the Actions tab at:
<https://github.com/EthanThatOneKid/github_api_types/actions/workflows/generate.yaml>

#### `/.github/workflows/release.yaml`

Weekly workflow that releases a new version of the module.

> NOTE: The
> [`deno.land/x/github_api_types`](https://deno.land/x/github_api_types) module
> is configured to automatically update to the latest version on release.

##### Repository secrets

Add new repository secrets to this repository at:
<https://github.com/EthanThatOneKid/github_api_types/settings/secrets/actions/new>.

###### `RELEASE_GITHUB_TOKEN`

This secret is a GitHub token with `Only select repositories` and the
`github_api_types` repository selected. Generate it at:
<https://github.com/settings/personal-access-tokens/new>. Set the `Contents`
permission to `Read & Write`.

This secret is used for the
[`softprops/action-gh-release`](https://github.com/softprops/action-gh-release#readme)
action to create releases on GitHub.

##### Run manually

To run this workflow manually, go to the Actions tab at:
<https://github.com/EthanThatOneKid/github_api_types/actions/workflows/release.yaml>
