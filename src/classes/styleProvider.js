var ngStyleProvider = function($scope, grid) {
    $scope.headerCellStyle = function(col) {
        return { "height": col.headerRowHeight + "px" };
    };
    $scope.rowStyle = function (row) {
        //Find out highest cell height
        var rowHeight = $scope.rowHeight;
        var cols = row.elm.context.children.length;
        for (var r = 0; r < cols; r++) {
            if (rowHeight < row.elm.context.children[r].children[1].scrollHeight) {
                rowHeight = row.elm.context.children[r].children[1].scrollHeight;
                row.rowHeight = rowHeight;
                row.cellsMarginTop = rowHeight *  0.009 + 'em';
            }
        }

        if (rowHeight > $scope.rowHeight) {
            row.cellsMarginTop = rowHeight *  0.009 + 'em';
        } else {
            row.cellsMarginTop = 0 + 'em';
        } 

        //Fix offsetTop of next cell
        if (grid.rowCache[row.rowIndex + 1] != null) {
            grid.rowCache[row.rowIndex + 1].clone.offsetTop = row.offsetTop + rowHeight;
        }
        //Fix grid height
        else  {
            grid.$viewport[0].style.height = row.offsetTop + rowHeight + 20 + "px";
        }

        var ret = { "top": row.offsetTop + "px", "height": rowHeight + "px" };
        if (row.isAggRow) {
            ret.left = row.offsetLeft;
        }
        return ret;
    };

    $scope.cellStyle = function(row, col) {
        var ret = "";
        if (!col.colDef.dynamicHeight &&
            angular.isDefined(row.cellsMarginTop)) {
            var ret = {"margin-top": row.cellsMarginTop};
        }
        return ret;
    }

    $scope.canvasStyle = function() {
        //Not necessary to set height anymore. All function could be erased
        return "";
    };
    $scope.headerScrollerStyle = function() {
        return { "height": grid.config.headerRowHeight + "px" };
    };
    $scope.topPanelStyle = function() {
        return { "width": grid.rootDim.outerWidth + "px", "height": $scope.topPanelHeight() + "px" };
    };
    $scope.headerStyle = function() {
        return { "width": grid.rootDim.outerWidth + "px", "height": grid.config.headerRowHeight + "px" };
    };
    $scope.groupPanelStyle = function () {
        return { "width": grid.rootDim.outerWidth + "px", "height": "32px" };
    };
    $scope.viewportStyle = function() {
        return { "width": grid.rootDim.outerWidth + "px", "height": $scope.viewportDimHeight() + "px" };
    };
    $scope.footerStyle = function() {
        return { "width": grid.rootDim.outerWidth + "px", "height": $scope.footerRowHeight + "px" };
    };
};
