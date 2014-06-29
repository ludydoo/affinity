Ext.data.JsonP.Functions_Date_WeekOfYear({"tagname":"class","name":"Functions.Date.WeekOfYear","autodetected":{},"files":[{"filename":"WeekOfYear.js","href":"WeekOfYear.html#Functions-Date-WeekOfYear"}],"extends":"Function","members":[{"name":"value","tagname":"method","owner":"Functions.Date.WeekOfYear","id":"method-value","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-Functions.Date.WeekOfYear","short_doc":"Function that extracts a date's week number (0-51)\n\nWith extend operation :\n\n var events = new affinity.Relation([\n  ...","component":false,"superclasses":["Function"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Function<div class='subclass '><strong>Functions.Date.WeekOfYear</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/WeekOfYear.html#Functions-Date-WeekOfYear' target='_blank'>WeekOfYear.js</a></div></pre><div class='doc-contents'><p>Function that extracts a date's week number (0-51)</p>\n\n<p>With extend operation :</p>\n\n<pre><code> var events = new affinity.Relation([\n     {date : {type : affinity.Date}},\n     {name : {type : affinity.String}}\n ],[\n     [new Date(2014, 02, 07), 'Sochi'],\n     [new Date(2014, 01, 02), 'Chocolate rush'],\n     [new Date(2014, 04, 15), 'Millionth coffee drank']\n ])\n\n var date = events.get('date')\n\n var extended = events.extend([ { \"date.weekOfYear()\" : date.weekOfYear() } ]);\n\n // or equivalent\n\n var extended = events.extend([ { \"date.weekOfYear()\" : new affinity.weekOfYear(date) } ]);\n\n extended.print();\n\n // +-------------------------------------------+--------------------------+-------------------------------+\n // | date : Date                               | name : String            | date.weekOfYear() : Integer   |\n // +===========================================+==========================+===============================+\n // | Fri Mar 07 2014 00:00:00 GMT-0500 (EST)   | Sochi                    | 10                            |\n // +-------------------------------------------+--------------------------+-------------------------------+\n // | Sun Feb 02 2014 00:00:00 GMT-0500 (EST)   | Chocolate rush           | 5                             |\n // +-------------------------------------------+--------------------------+-------------------------------+\n // | Thu May 15 2014 00:00:00 GMT-0400 (EDT)   | Millionth coffee drank   | 20                            |\n // +-------------------------------------------+--------------------------+-------------------------------+\n //\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-value' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Functions.Date.WeekOfYear'>Functions.Date.WeekOfYear</span><br/><a href='source/WeekOfYear.html#Functions-Date-WeekOfYear-method-value' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Functions.Date.WeekOfYear-method-value' class='name expandable'>value</a>( <span class='pre'></span> ) : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Gets the function return value ...</div><div class='long'><p>Gets the function return value</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>number</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});