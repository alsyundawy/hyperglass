import os
import sys
import click
from logzero import logger
from hyperglass import render as render
from hyperglass import hyperglass


@click.group()
def main():
    pass


@main.command()
def clearcache():
    try:
        hyperglass.clearCache()
        logger.info("Successfully cleared cache.")
    except:
        raise
        logger.error("Failed to clear cache.")


@main.command()
def testserver():
    try:
        render.css.renderTemplate()
        hyperglass.app.run(host="0.0.0.0", debug=True, port=5000)
        logger.error("Started test server.")
    except:
        logger.error("Failed to start test server.")
        raise


if __name__ == "__main__":
    main()