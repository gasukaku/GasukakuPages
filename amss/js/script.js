function writeHeader(rootDir){
  $.ajax({
        url: "/amss/js/header.html",
        cache: false,
        async: false,
        success: function(html){

            html = html.replace(/\{\$root\}/g, rootDir);
            document.write(html);
        }
    });
}

function writeFooter(rootDir){
  $.ajax({
        url: "/amss/js/footer.html",
        cache: false,
        async: false,
        success: function(html){

            html = html.replace(/\{\$root\}/g, rootDir);
            document.write(html);
        }
    });
}

 // profiles.js

// ユーザー情報を取得し、表示する関数
function displayUserProfile(userId) {
    const userProfileDiv = document.getElementById(userId);
    const user = getUserInfo(userId);

    if (user) {
        const profileImage = new Image();
        profileImage.src = user.profileImageURL;
        profileImage.width = 100;
        profileImage.height = 100;
        userProfileDiv.appendChild(profileImage);
        const username = userProfileDiv.getAttribute("data-username");
        userProfileDiv.insertAdjacentHTML('beforeend', `<p>${username}</p>`);
    }
}

// ユーザー情報を返す関数（仮のデータを返す例）
function getUserInfo(userId) {
    const users = {
        user1: {
            userName: "ユーザー1",
            profileImageURL: "プロフィール1の画像URL"
        },
        user2: {
            userName: "ユーザー2",
            profileImageURL: "プロフィール2の画像URL"
        }
        // 他のユーザー情報も同様に追加
    };

    return users[userId];
}

// ユーザー1とユーザー2の情報を表示
displayUserProfile("user1");
displayUserProfile("user2");
 
