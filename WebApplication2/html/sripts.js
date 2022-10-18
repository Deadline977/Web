async function getUsers() {
    // ���������� ������ � �������� �����
    const response = await fetch("/api/users", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // ���� ������ ������ ���������
    if (response.ok === true) {
        // �������� ������
        const users = await response.json();
        const rows = document.querySelector("tbody");
        // ��������� ���������� �������� � �������
        users.forEach(user => rows.append(row(user)));
    }
}
async function getUser(id) {
    const response = await fetch(`/api/users/${id}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        document.getElementById("userId").value = user.id;
        document.getElementById("userName").value = user.name;
        document.getElementById("userAge").value = user.age;
    }
    else {
        // ���� ��������� ������, �������� ��������� �� ������
        const error = await response.json();
        console.log(error.message); // � ������� ��� �� �������
    }
}
async function createUser(userName, userAge) {

    const response = await fetch("api/users", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: userName,
            age: parseInt(userAge, 10)
        })
    });
    if (response.ok === true) {
        const user = await response.json();
        document.querySelector("tbody").append(row(user));
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}
async function editUser(userId, userName, userAge) {
    const response = await fetch("api/users", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: userId,
            name: userName,
            age: parseInt(userAge, 10)
        })
    });
    if (response.ok === true) {
        const user = await response.json();
        document.querySelector(`tr[data-rowid='${user.id}']`).replaceWith(row(user));
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}