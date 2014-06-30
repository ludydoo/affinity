Ext.data.JsonP.Header({"tagname":"class","name":"Header","autodetected":{},"files":[{"filename":"Header.js","href":"Header.html#Header"}],"extends":"Set","params":[{"tagname":"params","type":"Object","name":"attributes","optional":true,"doc":"\n","html_type":"Object"}],"throws":[{"type":"Object","doc":"<p>The attributes are not passed in Array format</p>\n\n<p>A Header is one of the two main parts of a\nRelation, along with the Body (which is a <a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a>).</p>\n\n<p>It is a <a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a> of Attributes. It defines the structure of the\nTuples that will be part of the body of the\nRelation. Each Tuple in a\nRelation must match its Header</p>\n\n<pre><code>var header = new affinity.header([\n     {firstname : affinity.string},\n     {lastname : affinity.string}\n])\n\nvar relation = new affinity.relation(); // create an empty relation without a header and without body\n\nrelation.header(header); // sets the relation's header\n\nrelation.add({firstName : 'John', lastName : 'Doe'}); // Add a tuple in the Relation that matches the header\n</code></pre>\n","html_type":"Object"}],"members":[{"name":"_deletedCount","tagname":"property","owner":"Set","id":"property-_deletedCount","meta":{}},{"name":"_elements","tagname":"property","owner":"Set","id":"property-_elements","meta":{}},{"name":"_type","tagname":"property","owner":"Set","id":"property-_type","meta":{}},{"name":"ee","tagname":"property","owner":"Set","id":"property-ee","meta":{}},{"name":"extend","tagname":"property","owner":"Base","id":"property-extend","meta":{}},{"name":"_indexByEquality","tagname":"method","owner":"Set","id":"method-_indexByEquality","meta":{"private":true}},{"name":"add","tagname":"method","owner":"Set","id":"method-add","meta":{}},{"name":"atIndex","tagname":"method","owner":"Set","id":"method-atIndex","meta":{}},{"name":"clone","tagname":"method","owner":"Header","id":"method-clone","meta":{}},{"name":"each","tagname":"method","owner":"Set","id":"method-each","meta":{}},{"name":"elements","tagname":"method","owner":"Set","id":"method-elements","meta":{}},{"name":"equal","tagname":"method","owner":"Set","id":"method-equal","meta":{}},{"name":"exists","tagname":"method","owner":"Set","id":"method-exists","meta":{}},{"name":"find","tagname":"method","owner":"Set","id":"method-find","meta":{}},{"name":"first","tagname":"method","owner":"Set","id":"method-first","meta":{}},{"name":"fromRelation","tagname":"method","owner":"Header","id":"method-fromRelation","meta":{}},{"name":"index","tagname":"method","owner":"Set","id":"method-index","meta":{}},{"name":"isProperSubset","tagname":"method","owner":"Set","id":"method-isProperSubset","meta":{}},{"name":"isProperSuperset","tagname":"method","owner":"Set","id":"method-isProperSuperset","meta":{}},{"name":"isSubset","tagname":"method","owner":"Set","id":"method-isSubset","meta":{}},{"name":"isSuperset","tagname":"method","owner":"Set","id":"method-isSuperset","meta":{}},{"name":"length","tagname":"method","owner":"Set","id":"method-length","meta":{}},{"name":"mixin","tagname":"method","owner":"Base","id":"method-mixin","meta":{}},{"name":"project","tagname":"method","owner":"Header","id":"method-project","meta":{}},{"name":"remove","tagname":"method","owner":"Header","id":"method-remove","meta":{}},{"name":"removeAt","tagname":"method","owner":"Set","id":"method-removeAt","meta":{}},{"name":"setDifference","tagname":"method","owner":"Set","id":"method-setDifference","meta":{}},{"name":"setIntersection","tagname":"method","owner":"Set","id":"method-setIntersection","meta":{}},{"name":"setProduct","tagname":"method","owner":"Set","id":"method-setProduct","meta":{}},{"name":"setSymmetricDifference","tagname":"method","owner":"Set","id":"method-setSymmetricDifference","meta":{}},{"name":"setUnion","tagname":"method","owner":"Set","id":"method-setUnion","meta":{}},{"name":"toRelation","tagname":"method","owner":"Header","id":"method-toRelation","meta":{}},{"name":"type","tagname":"method","owner":"Set","id":"method-type","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-Header","short_doc":"Header object constructor. ...","component":false,"superclasses":["Base","Type","Set"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/Base' rel='Base' class='docClass'>Base</a><div class='subclass '><a href='#!/api/Type' rel='Type' class='docClass'>Type</a><div class='subclass '><a href='#!/api/Set' rel='Set' class='docClass'>Set</a><div class='subclass '><strong>Header</strong></div></div></div></div><h4>Files</h4><div class='dependency'><a href='source/Header.html#Header' target='_blank'>Header.js</a></div></pre><div class='doc-contents'><p>Header object constructor.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>attributes</span> : Object (optional)<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Throws</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>The attributes are not passed in Array format</p>\n\n<p>A Header is one of the two main parts of a\nRelation, along with the Body (which is a <a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a>).</p>\n\n<p>It is a <a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a> of Attributes. It defines the structure of the\nTuples that will be part of the body of the\nRelation. Each Tuple in a\nRelation must match its Header</p>\n\n<pre><code>var header = new affinity.header([\n     {firstname : affinity.string},\n     {lastname : affinity.string}\n])\n\nvar relation = new affinity.relation(); // create an empty relation without a header and without body\n\nrelation.header(header); // sets the relation's header\n\nrelation.add({firstName : 'John', lastName : 'Doe'}); // Add a tuple in the Relation that matches the header\n</code></pre>\n</div></li></ul></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_deletedCount' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-property-_deletedCount' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-property-_deletedCount' class='name expandable'>_deletedCount</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>0</code></p></div></div></div><div id='property-_elements' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-property-_elements' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-property-_elements' class='name expandable'>_elements</a> : Array<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>[]</code></p></div></div></div><div id='property-_type' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-property-_type' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-property-_type' class='name expandable'>_type</a> : <a href=\"#!/api/Type\" rel=\"Type\" class=\"docClass\">Type</a><span class=\"signature\"></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-ee' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-property-ee' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-property-ee' class='name expandable'>ee</a> : EventEmitter<span class=\"signature\"></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-extend' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Base' rel='Base' class='defined-in docClass'>Base</a><br/><a href='source/Base.html#Base-property-extend' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Base-property-extend' class='name expandable'>extend</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-_indexByEquality' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-_indexByEquality' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-_indexByEquality' class='name expandable'>_indexByEquality</a>( <span class='pre'>object</span> ) : number|null<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>object</span> : *<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>number|null</span><div class='sub-desc'><p>Index of object if found, null otherwise\nFind the index of an element with defined type equality methods</p>\n</div></li></ul></div></div></div><div id='method-add' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-add' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-add' class='name expandable'>add</a>( <span class='pre'>element, [checkDuplicate]</span> ) : boolean<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>element</span> : *<div class='sub-desc'>\n</div></li><li><span class='pre'>checkDuplicate</span> : boolean (optional)<div class='sub-desc'><p>Tests for duplicate elements in the set. Set to false to skip this\nverification if you are sure the element is not in the set</p>\n<p>Defaults to: <code>true</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'><p>True if the element was added, false otherwise</p>\n\n<p>Directly add an element to the set.</p>\n</div></li></ul></div></div></div><div id='method-atIndex' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-atIndex' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-atIndex' class='name expandable'>atIndex</a>( <span class='pre'>index</span> ) : *<span class=\"signature\"></span></div><div class='description'><div class='short'>Gets the element at the specified index ...</div><div class='long'><p>Gets the element at the specified index</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>index</span> : number<div class='sub-desc'><p>The index of the element</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>*</span><div class='sub-desc'><p>The resulting element</p>\n</div></li></ul></div></div></div><div id='method-clone' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Header'>Header</span><br/><a href='source/Header.html#Header-method-clone' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Header-method-clone' class='name expandable'>clone</a>( <span class='pre'></span> ) : <a href=\"#!/api/Header\" rel=\"Header\" class=\"docClass\">Header</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Clone a header and its attributes ...</div><div class='long'><p>Clone a header and its attributes</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Header\" rel=\"Header\" class=\"docClass\">Header</a></span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/Set-method-clone\" rel=\"Set-method-clone\" class=\"docClass\">Set.clone</a></p></div></div></div><div id='method-each' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-each' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-each' class='name expandable'>each</a>( <span class='pre'>callback, [context]</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>callback</span> : Function<div class='sub-desc'><p>The callback function</p>\n</div></li><li><span class='pre'>context</span> : Object (optional)<div class='sub-desc'><p>The \"this\" context for the callback</p>\n\n<p>Iterator function. Only an alias for lodash _.forEach</p>\n</div></li></ul></div></div></div><div id='method-elements' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-elements' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-elements' class='name expandable'>elements</a>( <span class='pre'>[elements]</span> ) : null|Array<span class=\"signature\"></span></div><div class='description'><div class='short'>Gets or sets the elements of the set ...</div><div class='long'><p>Gets or sets the elements of the set</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>elements</span> : Array (optional)<div class='sub-desc'><p>elements of the set</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>null|Array</span><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Throws</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>Will throw if the type of the Set has not been set</p>\n</div></li></ul></div></div></div><div id='method-equal' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-equal' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-equal' class='name expandable'>equal</a>( <span class='pre'>anotherSet</span> ) : boolean<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>anotherSet</span> : <a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'><p>Checks if two sets are equal</p>\n</div></li></ul></div></div></div><div id='method-exists' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-exists' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-exists' class='name expandable'>exists</a>( <span class='pre'>element</span> ) : boolean<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>element</span> : *<div class='sub-desc'><p>The element to check for</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'><p>True if the element exists, false if not</p>\n\n<p>Checks if an element exists in the set.</p>\n</div></li></ul></div></div></div><div id='method-find' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-find' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-find' class='name expandable'>find</a>( <span class='pre'>element</span> ) : null|*<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>element</span> : *<div class='sub-desc'><p>The element to find</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>null|*</span><div class='sub-desc'><p>the resulting element or null if not found</p>\n\n<p>Finds an element</p>\n</div></li></ul></div></div></div><div id='method-first' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-first' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-first' class='name expandable'>first</a>( <span class='pre'></span> ) : null|*<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>null|*</span><div class='sub-desc'><p>The first element or null.</p>\n\n<p>Gets the first element from the set.</p>\n</div></li></ul></div></div></div><div id='method-fromRelation' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Header'>Header</span><br/><a href='source/Header.html#Header-method-fromRelation' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Header-method-fromRelation' class='name expandable'>fromRelation</a>( <span class='pre'>relation</span> ) : <a href=\"#!/api/Header\" rel=\"Header\" class=\"docClass\">Header</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Converts a relation into a header. ...</div><div class='long'><p>Converts a relation into a header.\nThe relation must have the header only with attributes name : TString and type : TType.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>relation</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Header\" rel=\"Header\" class=\"docClass\">Header</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-index' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-index' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-index' class='name expandable'>index</a>( <span class='pre'>element</span> ) : null|number<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>element</span> : Object<div class='sub-desc'><p>The element to search for</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>null|number</span><div class='sub-desc'><p>The index of the element if found, null otherwise</p>\n\n<p>Gets the index of an element</p>\n</div></li></ul></div></div></div><div id='method-isProperSubset' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-isProperSubset' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-isProperSubset' class='name expandable'>isProperSubset</a>( <span class='pre'>aSet</span> ) : boolean<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>aSet</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'><p>Determines if the set is a proper subset of another set</p>\n</div></li></ul></div></div></div><div id='method-isProperSuperset' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-isProperSuperset' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-isProperSuperset' class='name expandable'>isProperSuperset</a>( <span class='pre'>aSet</span> ) : boolean<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>aSet</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'><p>Determine if the set is a proper superset of another set</p>\n</div></li></ul></div></div></div><div id='method-isSubset' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-isSubset' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-isSubset' class='name expandable'>isSubset</a>( <span class='pre'>aSet</span> ) : boolean<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>aSet</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'><p>Determine if the set is a subset of another set.</p>\n</div></li></ul></div></div></div><div id='method-isSuperset' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-isSuperset' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-isSuperset' class='name expandable'>isSuperset</a>( <span class='pre'>aSet</span> ) : boolean<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>aSet</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'><p>Determine if the set is a superset of another set</p>\n</div></li></ul></div></div></div><div id='method-length' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-length' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-length' class='name expandable'>length</a>( <span class='pre'></span> ) : number<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>number</span><div class='sub-desc'><p>Number of elements in the set</p>\n</div></li></ul></div></div></div><div id='method-mixin' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Base' rel='Base' class='defined-in docClass'>Base</a><br/><a href='source/Base.html#Base-method-mixin' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Base-method-mixin' class='name expandable'>mixin</a>( <span class='pre'>mixin</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>mixin</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-project' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Header'>Header</span><br/><a href='source/Header.html#Header-method-project' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Header-method-project' class='name expandable'>project</a>( <span class='pre'>projectedAttributes</span> ) : <a href=\"#!/api/Header\" rel=\"Header\" class=\"docClass\">Header</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Project operation on Header object ...</div><div class='long'><p>Project operation on Header object</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>projectedAttributes</span> : String[]|<a href=\"#!/api/Attribute\" rel=\"Attribute\" class=\"docClass\">Attribute</a>[]<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Header\" rel=\"Header\" class=\"docClass\">Header</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-remove' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Header'>Header</span><br/><a href='source/Header.html#Header-method-remove' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Header-method-remove' class='name expandable'>remove</a>( <span class='pre'>attributesToRemove</span> ) : <a href=\"#!/api/Header\" rel=\"Header\" class=\"docClass\">Header</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Perform a removal operation on the header ...</div><div class='long'><p>Perform a removal operation on the header</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>attributesToRemove</span> : <a href=\"#!/api/Attribute\" rel=\"Attribute\" class=\"docClass\">Attribute</a>[]|String[]|<a href=\"#!/api/Attribute\" rel=\"Attribute\" class=\"docClass\">Attribute</a>|String<div class='sub-desc'><p>attributes to remove from the header</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Header\" rel=\"Header\" class=\"docClass\">Header</a></span><div class='sub-desc'><p>the resulting header</p>\n</div></li></ul><p>Overrides: <a href=\"#!/api/Set-method-remove\" rel=\"Set-method-remove\" class=\"docClass\">Set.remove</a></p></div></div></div><div id='method-removeAt' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-removeAt' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-removeAt' class='name expandable'>removeAt</a>( <span class='pre'>index</span> ) : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>index</span> : String<div class='sub-desc'><p>The index at which to remove the element</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>True if deleted, false otherwise</p>\n\n<p>Removes an element from the set at the specified index.</p>\n</div></li></ul></div></div></div><div id='method-setDifference' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-setDifference' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-setDifference' class='name expandable'>setDifference</a>( <span class='pre'>set2</span> ) : <a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>set2</span> : <a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a><div class='sub-desc'><p>The set acting as a pastry cutter</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a></span><div class='sub-desc'><p>@example</p>\n\n<p>Perform a difference between two sets. Returns a set with the elements of A without\nthose that A and B have in common.</p>\n\n<pre><code>var set1 = new affinity.Set(affinity.Integer, [1, 2, 3]);\n\nvar set2 = new affinity.Set(affinity.Integer, [3, 4, 5]);\n\nvar result = set1.setDifference(set2);\n\n// Set has elements [1, 2]\n</code></pre>\n</div></li></ul></div></div></div><div id='method-setIntersection' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-setIntersection' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-setIntersection' class='name expandable'>setIntersection</a>( <span class='pre'>set2</span> ) : <a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>set2</span> : <a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a><div class='sub-desc'><p>The set to be intersected with</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a></span><div class='sub-desc'><p>The resulting set</p>\n\n<p>Performs an intersection with another set. Returns a set with\nthe elements that A and B have in common.</p>\n\n<pre><code>var set1 = new affinity.Set(affinity.Integer, [1, 2, 3]);\n\nvar set2 = new affinity.Set(affinity.Integer, [3, 4, 5]);\n\nvar result = set1.setIntersection(set2);\n\n// Set has elements [3]\n</code></pre>\n</div></li></ul></div></div></div><div id='method-setProduct' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-setProduct' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-setProduct' class='name expandable'>setProduct</a>( <span class='pre'>set2</span> ) : <a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>set2</span> : <a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a><div class='sub-desc'><p>The set to perform product with</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a></span><div class='sub-desc'><p>@example</p>\n\n<p>Performs a product of two sets. Returns a set with all the possible combinations\nof elements from A combined with those of B. This operation will return a set containing\ntuples with attributes { 0 : attr1, 1 : attr2}. 0 is the left set element, 1 is the\nright set element.</p>\n\n<pre><code>var set1 = new affinity.Set(affinity.Integer, [1, 2]);\n\nvar set2 = new affinity.Set(affinity.Integer, [3, 4]);\n\nvar result = set1.setProduct(set2);\n\n// Set has elements [Tuple(0 : 1, 1 : 3),Tuple(0 : 1, 1 : 4),Tuple(0 : 2, 1 : 2),Tuple(0 : 2, 1 : 4)]\n</code></pre>\n</div></li></ul></div></div></div><div id='method-setSymmetricDifference' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-setSymmetricDifference' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-setSymmetricDifference' class='name expandable'>setSymmetricDifference</a>( <span class='pre'>set2</span> ) : <a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>set2</span> : <a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a><div class='sub-desc'><p>The set to peform symmetric difference against</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a></span><div class='sub-desc'><p>The resulting set</p>\n\n<p>Performs a symmetric difference. Returns a set with the elements that A\nand B do not have in common.</p>\n\n<pre><code>var set1 = new affinity.Set(affinity.Integer, [1, 2, 3]);\n\nvar set2 = new affinity.Set(affinity.Integer, [3, 4, 5]);\n\nvar result = set1.setSymmetricDifference(set2);\n\n// Set has elements [1, 2, 4, 5]\n</code></pre>\n</div></li></ul></div></div></div><div id='method-setUnion' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-setUnion' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-setUnion' class='name expandable'>setUnion</a>( <span class='pre'>set2</span> ) : <a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>set2</span> : <a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a><div class='sub-desc'><p>The set to perform union with</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Set\" rel=\"Set\" class=\"docClass\">Set</a></span><div class='sub-desc'><p>The resulting set</p>\n\n<p>Union of two sets. Returns a set containing all the elements from A and B.</p>\n\n<pre><code>var set1 = new affinity.Set(affinity.Integer, [1, 2, 3]);\n\nvar set2 = new affinity.Set(affinity.Integer, [3, 4, 5]);\n\nvar result = set1.setUnion(set2);\n\n// Set has elements [1, 2, 3, 4, 5] (note no duplicates)\n</code></pre>\n</div></li></ul></div></div></div><div id='method-toRelation' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Header'>Header</span><br/><a href='source/Header.html#Header-method-toRelation' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Header-method-toRelation' class='name expandable'>toRelation</a>( <span class='pre'></span> ) : <a href=\"#!/api/Relation\" rel=\"Relation\" class=\"docClass\">Relation</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Relation\" rel=\"Relation\" class=\"docClass\">Relation</a></span><div class='sub-desc'><p>The relation representation of the header</p>\n</div></li></ul></div></div></div><div id='method-type' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Set' rel='Set' class='defined-in docClass'>Set</a><br/><a href='source/Set.html#Set-method-type' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Set-method-type' class='name expandable'>type</a>( <span class='pre'>[type]</span> ) : null|<a href=\"#!/api/Type\" rel=\"Type\" class=\"docClass\">Type</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : <a href=\"#!/api/Type\" rel=\"Type\" class=\"docClass\">Type</a> (optional)<div class='sub-desc'><p>The type of the Set</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>null|<a href=\"#!/api/Type\" rel=\"Type\" class=\"docClass\">Type</a></span><div class='sub-desc'><p>Getter/Setter for the type parameter. When used without parameter, will return\nthe type of the Set. When used with a parameter, will set the set's type.</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});