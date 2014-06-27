Ext.data.JsonP.Functions_Date_Minutes({"tagname":"class","name":"Functions.Date.Minutes","autodetected":{},"files":[{"filename":"Minutes.js","href":"Minutes.html#Functions-Date-Minutes"}],"extends":"Function","members":[],"alternateClassNames":[],"aliases":{},"id":"class-Functions.Date.Minutes","short_doc":"Function that extracts a date's minutes component as an integer\n\nWith extend operation :\n\n var quarterToFive = new Da...","component":false,"superclasses":["Function"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Function<div class='subclass '><strong>Functions.Date.Minutes</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/Minutes.html#Functions-Date-Minutes' target='_blank'>Minutes.js</a></div></pre><div class='doc-contents'><p>Function that extracts a date's minutes component as an integer</p>\n\n<p>With extend operation :</p>\n\n<pre><code> var quarterToFive = new Date();\n wokeUp.setHours(4);\n wokeUp.setMinutes(45);\n\n var five = new Date();\n five.setHours(5)\n five.setMinutes(0);\n\n var sixThirty = new Date();\n sixThirty.setHours(6);\n sixThirty.setMinutes(30);\n\n\n var events = new affinity.Relation([\n     {time : {type : affinity.Date}},\n     {name : {type : affinity.String}}\n ],[\n     [quarterToFive, 'Quarter to Five'],\n     [five, 'Five'],\n     [sixThirty, 'Six Thirty']\n ])\n\n var time = events.get('time')\n\n var extended = events.extend([ { minute : time.minutes() } ]);\n\n // or equivalent\n\n var extended = events.extend([ { minute : new affinity.Minutes(time) } ]);\n\n extended.print();\n\n // +--------------+------------------------+------------------+\n // | time : Date  | name : String          | minute : Integer |\n // +==============+========================+==================+\n // | 4:45         | Quarter to Five        | 45               |\n // +--------------+------------------------+------------------+\n // | 5:00         | Five                   | 0                |\n // +--------------+------------------------+------------------+\n // | 6:30         | Six Thirty             | 30               |\n // +--------------+------------------------+------------------+\n</code></pre>\n</div><div class='members'></div></div>","meta":{}});