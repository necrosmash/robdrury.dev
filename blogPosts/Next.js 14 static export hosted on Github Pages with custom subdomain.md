---
'id': 4
'title': 'Next.js 14 static export hosted on Github Pages with custom subdomain'
'uploaded': '2024-08-27'
'tags': 'next.js,github_pages'
---

I had to do this for [languagelinks.robdrury.dev](https://languagelinks.robdrury.dev) recently - I wanted to make the game available on its own subdomain, and host it on Github Pages. I also wanted it to be a [project site](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#types-of-github-pages-sites) - a page that is hosted from `[username].github.io/[projectname]` as opposed to `[username].github.io` (you only get one of those, after all). I won't go far into the intricacies of the [export process](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#configuration), or what you [lose by choosing static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#unsupported-features) - suffice it to say, if it meets your needs you may see the appeal.

Bear in mind that if you want to do this on a private repo you need a premium Github plan. Otherwise, the repo must be public.

## Github Action

I'm using yarn 4, so my process might be slightly different from yours WRT Github Actions. You could replace the `Install dependencies` step if you're not using yarn.

```yml,.github/workflows/publish.yml
name: publish-to-github-pages
on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install dependencies
        uses: ./.github/workflows/setup-node

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Publish to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Here's that `Install dependencies` step if you need that too:

```yml,.github/workflows/setup-node/action.yml
name: setup-node
description: "Install dependencies and build with yarn"
runs:
  using: "composite"
  steps:
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 20

    - name: Run install
      uses: borales/actions-yarn@v4
      with:
        cmd: install

    - name: Build production bundle
      uses: borales/actions-yarn@v4
      with:
        cmd: build # will run `yarn build` command
```

If you wanted to take what we've done so far and host it on Github Pages as-is, you could do so. You would just need

- to configure the [build and deployment section](#Github%20setup) in the settings of the Github project (every change you need to make is in that screenshot, except you don't need the custom domain)
- the following next.js config:

```ts,next.config.mjs
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.ASSET_PREFIX || "",
  output: "export",
};
```

```,.env.production
NEXT_PUBLIC_BASE_PATH=/[projectname]
ASSET_PREFIX=/[projectname]/
```

For example, in order for my repo at `rob.github.io/amazingproject` to work, I would need:

```,.env.production
NEXT_PUBLIC_BASE_PATH=/amazingproject
ASSET_PREFIX=/amazingproject/
```

However, that obviously doesn't get us the custom domain, and we deserve the best in life.

## Domain DNS setup

I own my domain through Squarespace, but I'm using Digital Ocean's dashboard on account of using Digital Ocean nameservers. Regardless, I will assume that you have access to some kind of web UI dashboard that provides a way of updating your DNS records, as this seems pretty standard. Make a CNAME entry, with `[subdomain].[domain].[tld]` as the hostname, and `[username].github.io` as the value.

![screenshot of CNAME DNS record](/4/dns_records.png)

This use of `[username].github.io` confused me before - wouldn't that be for a user page, rather than a project page? That's something we can address on github very easily.

## Github setup

Firstly, let's disable Jekyll. Create a file called `.nojekyll` in the root of your repo. Commit and push to whichever branch you're deploying from (I just use `main`).

Then, in your repo, go to `Settings` -> `Pages`. Under `Build and deployment`, I have `Deploy from a branch` selected. Under `Branch`, choose whichever branch you're deploying from and make sure `/ (root)` is chosen for the path.

Add your subdomain under `Custom domain`. Input the whole URL - `[subdomain].[domain].[tld]`. This will make a new commit with a file called `CNAME` in the root of your repo. This will allow your browser to remain on `[subdomain].[domain].[tld]` after being directed towards your `[username].github.io/[projectname]` page.

![screenshot of Github Build and Deployment page](/4/github_build_and_deployment.png)

Lastly, if you've been accessing your Github Pages site through `[username].github.io/[projectname]` in the past (like I mentioned before), you'll need to change your `next.config.mjs` back to something like this:

```tsx
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '',
  assetPrefix: '',
  output: 'export',
}

export default nextConfig
```

This is because we're now on `[subdomain].[domain].[tld]` - no need for the `basePath` and `assetPrefix` anymore.

With that, you should be good. Burn some incense and say a prayer to the DNS gods for speedy propagation.

![screenshot Language Links URL in browser](/4/language_links_url.png)
