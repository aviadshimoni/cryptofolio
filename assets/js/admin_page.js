function search (dropdown) {
    var id = dropdown.options[dropdown.selectedIndex].value
    window.location.href="http://localhost:3000/admin?coinId="+id;
};