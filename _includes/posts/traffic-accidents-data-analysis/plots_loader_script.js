
<script type="text/javascript">
  (function() {
    var fn = function() {
      Bokeh.safely(function() {
        (function(root) {
          function embed_document(root) {
            
          var render_items = [{"docid":"a4a93b4f-9cfb-4cce-b056-9509a8f4df26","roots":{"1001":"25ab46fa-d23c-4dcd-b135-26aaf8d3be11","1117":"0ed070b7-2ba6-4857-9001-b265787210d7","1233":"ec8b2217-6269-4542-a29f-b9a0a9b7d959","1349":"adfe4dad-0301-402c-bb05-72a9ae963ffe","1448":"dcd58c14-981f-4154-9e2e-04116fa14d6f","1547":"35d6f562-9150-457b-b046-edc9ad1914f1","1642":"582387db-4579-44ec-a476-1f71059e143c"}}];
          root.Bokeh.embed.embed_items(docs_json, render_items);
        
          }
          if (root.Bokeh !== undefined) {
            embed_document(root);
          } else {
            var attempts = 0;
            var timer = setInterval(function(root) {
              if (root.Bokeh !== undefined) {
                embed_document(root);
                clearInterval(timer);
              }
              attempts++;
              if (attempts > 100) {
                console.log("Bokeh: ERROR: Unable to run BokehJS code because BokehJS library is missing");
                clearInterval(timer);
              }
            }, 10, root)
          }
        })(window);
      });
    };
    if (document.readyState != "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  })();
</script>