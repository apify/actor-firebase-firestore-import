## Empty TypeScript template

Start a new [web scraping](https://apify.com/web-scraping) project quickly and easily in TypeScript (Node.js) with our empty project template. It provides a basic structure for the Actor with [Apify SDK](https://docs.apify.com/sdk/js/) and allows you to easily add your own functionality.

## Included features

- **[Apify SDK](https://docs.apify.com/sdk/js/)** - a toolkit for building [Actors](https://apify.com/actors)
- **[Crawlee](https://crawlee.dev/)** - web scraping and browser automation library

## How it works

Insert your own code between `await Actor.init()` and `await Actor.exit()`. If you would like to use the [Crawlee](https://crawlee.dev/) library simply uncomment its import `import { CheerioCrawler } from 'crawlee';`.

## Resources

- [TypeScript vs. JavaScript: which to use for web scraping?](https://blog.apify.com/typescript-vs-javascript-crawler/)
- [Node.js tutorials](https://docs.apify.com/academy/node-js) in Academy
- [Video guide on getting scraped data using Apify API](https://www.youtube.com/watch?v=ViYYDHSBAKM)
- [Integration with Airbyte](https://apify.com/integrations), Make, Zapier, Google Drive, and other apps


## Getting started

For complete information [see this article](https://docs.apify.com/platform/actors/development#build-actor-at-apify-console). In short, you will:

1. Build the Actor
2. Run the Actor

## Pull the Actor for local development

If you would like to develop locally, you can pull the existing Actor from Apify console using Apify CLI:

1. Install `apify-cli`

    **Using Homebrew**

    ```
    brew install apify/tap/apify-cli
    ```

    **Using NPM**

    ```
    npm -g install apify-cli
    ```

2. Pull the Actor by its unique `<ActorId>`, which is one of the following:
    - unique name of the Actor to pull (e.g. "apify/hello-world")
    - or ID of the Actor to pull (e.g. "E2jjCZBezvAZnX8Rb")

    You can find both by clicking on the Actor title at the top of the page, which will open a modal containing both Actor unique name and Actor ID.

    This command will copy the Actor into the current directory on your local machine.

    ```
    apify pull <ActorId>
    ```

## Documentation reference

To learn more about Apify and Actors, take a look at the following resources:

- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
