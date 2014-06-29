Ext.data.JsonP.Functions_Numeric_Cosine({"tagname":"class","name":"Functions.Numeric.Cosine","autodetected":{},"files":[{"filename":"Cosine.js","href":"Cosine.html#Functions-Numeric-Cosine"}],"extends":"Function","members":[{"name":"value","tagname":"method","owner":"Functions.Numeric.Cosine","id":"method-value","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-Functions.Numeric.Cosine","short_doc":"Function that returns the cosine of a number\n\nExample with Extend operator :\n\n var relation = new affinity.Relation([...","component":false,"superclasses":["Function"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Function<div class='subclass '><strong>Functions.Numeric.Cosine</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/Cosine.html#Functions-Numeric-Cosine' target='_blank'>Cosine.js</a></div></pre><div class='doc-contents'><p>Function that returns the cosine of a number</p>\n\n<p>Example with Extend operator :</p>\n\n<pre><code> var relation = new affinity.Relation([\n     { A :  {type : affinity.Integer} },\n ],[\n     [0], [Math.PI/2], [Math.PI], [3*Math.PI/2], [2*Math.PI]\n ])\n\n var A = relation.get('A');\n\n\n var B = relation.extend([{ B : A.cos() }]);\n\n // or\n\n var B = relation.extend([{ B : new affinity.Cosine(A) }]);\n\n B.print();\n\n //+---------------+---------------+\n //| A : Integer   | B : Integer   |\n //+===============+===============+\n //| 0             | 1             |\n //+---------------+---------------+\n //| PI/2          | 0             |\n //+---------------+---------------+\n //| π             | -1            |\n //+---------------+---------------+\n //| 3π/2          | 0             |\n //+---------------+---------------+\n //| 2π            | 1             |\n //+---------------+---------------+\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-value' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Functions.Numeric.Cosine'>Functions.Numeric.Cosine</span><br/><a href='source/Cosine.html#Functions-Numeric-Cosine-method-value' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Functions.Numeric.Cosine-method-value' class='name expandable'>value</a>( <span class='pre'></span> ) : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>Gets the function result ...</div><div class='long'><p>Gets the function result</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});