Ext.data.JsonP.Functions_Date_Month({"tagname":"class","name":"Functions.Date.Month","autodetected":{},"files":[{"filename":"Month.js","href":"Month.html#Functions-Date-Month"}],"extends":"Function","members":[],"alternateClassNames":[],"aliases":{},"id":"class-Functions.Date.Month","short_doc":"Function that extracts a date's month number\n\nJanuary is 0\n\nWith extend operation :\n\n var events = new affinity.Relat...","component":false,"superclasses":["Function"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Function<div class='subclass '><strong>Functions.Date.Month</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/Month.html#Functions-Date-Month' target='_blank'>Month.js</a></div></pre><div class='doc-contents'><p>Function that extracts a date's month number</p>\n\n<p>January is 0</p>\n\n<p>With extend operation :</p>\n\n<pre><code> var events = new affinity.Relation([\n     {date : {type : affinity.Date}},\n     {name : {type : affinity.String}}\n ],[\n     [new Date(2014, 1, 07), 'Sochi'],\n     [new Date(2014, 0, 02), 'Chocolate rush'],\n     [new Date(2014, 3, 15), 'Millionth coffee drank']\n ])\n\n var date = events.get('date')\n\n var extended = events.extend([ { \"date.month()\" : date.month() } ]);\n\n // or equivalent\n\n var extended = events.extend([ { \"date.month()\" : new affinity.Month(date) } ]);\n\n extended.print();\n\n // +-------------------------------------------+--------------------------+--------------------------+\n // | date : Date                               | name : String            | date.month() : Integer   |\n // +===========================================+==========================+==========================+\n // | Fri Feb 07 2014 00:00:00 GMT-0500 (EST)   | Sochi                    | 1                        |\n // +-------------------------------------------+--------------------------+--------------------------+\n // | Thu Jan 02 2014 00:00:00 GMT-0500 (EST)   | Chocolate rush           | 0                        |\n // +-------------------------------------------+--------------------------+--------------------------+\n // | Tue Apr 15 2014 00:00:00 GMT-0400 (EDT)   | Millionth coffee drank   | 3                        |\n // +-------------------------------------------+--------------------------+--------------------------+\n //\n</code></pre>\n</div><div class='members'></div></div>","meta":{}});