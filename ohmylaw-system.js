(function() {
  var chatbotContainer = document.createElement('div');
  chatbotContainer.setAttribute('id', 'chatbot-container');
  
  var chatbotIcon = document.createElement('div');
  chatbotIcon.setAttribute('id', 'chatbot-icon');
  chatbotIcon.innerHTML = '&#128521;';
  
  var chatbotMessages = document.createElement('div');
  chatbotMessages.setAttribute('id', 'chatbot-messages');
  
  var messageInputContainer = document.createElement('div');
  messageInputContainer.setAttribute('id', 'message-input-container');
  
  var questionInput = document.createElement('input');
  questionInput.setAttribute('type', 'text');
  questionInput.setAttribute('id', 'question-input');
  questionInput.setAttribute('placeholder', 'Posez votre question...');
  
  var submitButton = document.createElement('button');
  submitButton.innerHTML = 'Envoyer';
  submitButton.setAttribute('id', 'submit-button');
  
  chatbotContainer.appendChild(chatbotIcon);
  chatbotContainer.appendChild(chatbotMessages);
  messageInputContainer.appendChild(questionInput);
  messageInputContainer.appendChild(submitButton);
  chatbotMessages.appendChild(messageInputContainer);
  document.body.appendChild(chatbotContainer);
  
  chatbotIcon.addEventListener('click', function() {
    chatbotMessages.style.display = chatbotMessages.style.display === 'none' ? 'flex' : 'none';
  });

  submitButton.addEventListener('click', function() {
    var question = questionInput.value;
    if (question) {
      // Ajouter la question de l'utilisateur au chat
      var userMessageContainer = document.createElement('div');
      userMessageContainer.classList.add('message-container', 'user-message');
      userMessageContainer.textContent = question;
      chatbotMessages.insertBefore(userMessageContainer, messageInputContainer);
      
      // Envoyer la question au serveur
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://ohmylaw.fr/wp-admin/admin-ajax.php');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onload = function() {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);

          // Ajouter la réponse du chatbot au chat
          var botMessageContainer = document.createElement('div');
          botMessageContainer.classList.add('message-container', 'bot-message');
          botMessageContainer.textContent = response;
          chatbotMessages.insertBefore(botMessageContainer, messageInputContainer);

          // Faites défiler le chat vers le bas pour afficher les nouveaux messages
          chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
      };
      xhr.send('action=envoyer_question&question=' + encodeURIComponent(question));
      questionInput.value = '';
    }
  });
})();
