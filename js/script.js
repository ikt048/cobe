$('#bold_btn').click(function () {
    document.execCommand('bold');
});
$('#italic_btn').click(function () {
    document.execCommand('italic');
});
$('#underline_btn').click(function () {
    document.execCommand('underline');
});

$(document).ready(function () {
    $('#TemplateTable').DataTable();
});

// Datatable
$(document).ready(function () {
    oTable = $('#TemplateTable').DataTable();
    $('#TemplateSearch').keyup(function () {
        oTable.search($(this).val()).draw();
    })
});
