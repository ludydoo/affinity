Ext.data.JsonP.Functions_Numeric_Power({"tagname":"class","name":"Functions.Numeric.Power","autodetected":{},"files":[{"filename":"Power.js","href":"Power.html#Functions-Numeric-Power"}],"extends":"Function","members":[{"name":"value","tagname":"method","owner":"Functions.Numeric.Power","id":"method-value","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-Functions.Numeric.Power","short_doc":"Returns a number to the power of another number\n\nexample :\n\nvar relation = new affinity.Relation([\n     { A : { type ...","component":false,"superclasses":["Function"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Function<div class='subclass '><strong>Functions.Numeric.Power</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/Power.html#Functions-Numeric-Power' target='_blank'>Power.js</a></div></pre><div class='doc-contents'><p>Returns a number to the power of another number</p>\n\n<p>example :</p>\n\n<pre><code>var relation = new affinity.Relation([\n     { A : { type : affinity.Integer}},\n     { B : { type : affinity.Integer}},\n],[\n     [1, -1],\n     [-1, 1],\n     [0, 10],\n     [1, 10],\n     [2, -10],\n])\n\nvar A = relation.get('A')\nvar B = relation.get('B')\n\nvar extended = relation.extend([{ \"A ^ B\" : A.pow(B)}])\n\n// or\n\nvar extended = relation.extend([{ \"A ^ B\" : new affinity.Pow(A, B)}])\n\nextended.print()\n\n// +---------------+---------------+-----------------+\n// | A : Integer   | B : Integer   | A ^ B : Numeric |\n// +===============+===============+=================+\n// | 1             | -1            | 1               |\n// +---------------+---------------+-----------------+\n// | -1            | 1             | -1              |\n// +---------------+---------------+-----------------+\n// | 0             | 10            | 0               |\n// +---------------+---------------+-----------------+\n// | 1             | 10            | 1               |\n// +---------------+---------------+-----------------+\n// | 2             | -10           | 0.0009765625    |\n// +---------------+---------------+-----------------+\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-value' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Functions.Numeric.Power'>Functions.Numeric.Power</span><br/><a href='source/Power.html#Functions-Numeric-Power-method-value' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Functions.Numeric.Power-method-value' class='name expandable'>value</a>( <span class='pre'></span> ) : number<span class=\"signature\"></span></div><div class='description'><div class='short'>Gets the function's return value; ...</div><div class='long'><p>Gets the function's return value;</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>number</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});