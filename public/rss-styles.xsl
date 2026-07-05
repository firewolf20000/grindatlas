<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="utf-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en"><head><meta charset="utf-8"/><title>GrindAtlas RSS Feed</title>
    <style>body{font-family:system-ui,sans-serif;max-width:800px;margin:2rem auto;padding:0 1rem;color:#1e293b}h1{color:#6d28d9}.item{padding:1rem;margin:1rem 0;border-left:4px solid #6d28d9;background:#f8fafc;border-radius:0 8px 8px 0}.item h2{margin:0 0 0.5rem 0;font-size:1.1rem}.item h2 a{color:#1e293b;text-decoration:none}.item .meta{color:#64748b;font-size:0.85rem;margin-bottom:0.5rem}.item .desc{color:#475569}</style>
    </head><body>
    <h1>GrindAtlas - RSS Feed</h1>
    <p>In-depth guides, tier lists, and interactive tools for idle, incremental, and roguelike games.</p>
    <p>Subscribe by pasting this URL into your RSS reader.</p>
    <xsl:for-each select="/rss/channel/item">
      <div class="item">
        <h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
        <div class="meta"><xsl:value-of select="pubDate"/></div>
        <p class="desc"><xsl:value-of select="description"/></p>
      </div>
    </xsl:for-each>
    </body></html>
  </xsl:template>
</xsl:stylesheet>