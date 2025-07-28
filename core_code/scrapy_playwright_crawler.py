
# scrapy_playwright_crawler.py
# Basic ethical crawler using Scrapy and Playwright

import scrapy
from scrapy_playwright.page import PageCoroutine

class EthicalScraperSpider(scrapy.Spider):
    name = "ethical_scraper"
    start_urls = ["https://example.com"]

    custom_settings = {
        "PLAYWRIGHT_BROWSER_TYPE": "chromium",
        "DOWNLOAD_HANDLERS": {
            "http": "scrapy_playwright.handler.ScrapyPlaywrightDownloadHandler",
            "https": "scrapy_playwright.handler.ScrapyPlaywrightDownloadHandler",
        },
        "TWISTED_REACTOR": "twisted.internet.asyncioreactor.AsyncioSelectorReactor",
        "PLAYWRIGHT_LAUNCH_OPTIONS": {"headless": True},
    }

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(
                url,
                meta={
                    "playwright": True,
                    "playwright_page_coroutines": [PageCoroutine("wait_for_timeout", 3000)]
                }
            )

    def parse(self, response):
        yield {
            "url": response.url,
            "title": response.css("title::text").get(),
        }
