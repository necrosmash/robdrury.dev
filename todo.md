# todo

navbar
    series of links for navigation
    actual active link for where we are
    can be dead simple at first, | delimited, bold for active location

blog entry json parsing
    currently it just shows the entire JSON object - it should parse it accordingly
    need support for both text and images. Images can be inserted in the middle of the text and will cause a break in the text, with the image inserted appropriately
    "content" should be an array of objects, with the keys "type" ("text" or "image") and "value" (paragraph or link URI)
        two "text"s in a row? That's a paragraph break
        two images in a row? carousel?
    type it accordingly

how do we address game page? pinned blog entry? all blog entries below as a list?

styling
    responsive UI?