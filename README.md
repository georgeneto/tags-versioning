# tags-versioning

Action for generating version based on tags.  \
Looks for tags that are named with the pattern v0.0.0, where each 0 can be replacade by any quantity. \
  Matcher regex: ``` /[Vv](\d)+\.(\d)+\.(\d)+/ ``` \
Sorts out the list and get the highest matched version. 

v1: **only "patch"** is automatically incremented. 

eg: tag **v1.0.3 is found   -> output v1.0.4**   is generated \
eg: tag **v42.92.1 is found -> output v42.92.2** is generated 

```yaml
  steps:
      ...
      - name: Increment version from repository's tags
        id: tages_versioning
        uses: georgeneto/tags-versioning
        with:
          repo-token: ${{secrets.GITHUB_TOKEN}}
      ...
```
          
and the outputs may be used as:  \
**${{ steps.version.outputs.last }}** = *last found version* \
**${{ steps.version.outputs.next }}** = *next generated version*
