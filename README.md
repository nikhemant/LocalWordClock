# View Current Time in Words in Regional languages - Marathi, Hindi, etc.

Add following code block in your HTML code and the Widget will appear

```
<div id="MarathiClockWidget"></div>
<script src="https://cdn.jsdelivr.net/gh/nikhemant/RegionalWordClock@main/widget/WordClockWidget.js" 
        data-lang="mr" data-elemid="MarathiClockWidget" data-css="inline"></script> 

```

Set the data parameters in script tag as follows:

- data-lang : Two letter ISO 639-1 Language code. Currently ```en```, ```mr```, ```hi``` are supported. More languages will be added.
- data-elemid : id of the HTML div element container for the widget
- data-css : 
  - default : uses the default css
  - inline : uses the user defined inline css for ```.WordClockWidget``` class


**Examples:**

[View Current Time in Words in English/Default](https://nikhemant.github.io/RegionalWordClock/index-lang.html)

[View Current Time in Words in Marathi](https://nikhemant.github.io/RegionalWordClock/index-lang.html?lang=mr)

[View Current Time in Words in Hindi](https://nikhemant.github.io/RegionalWordClock/index-lang.html?lang=hi)