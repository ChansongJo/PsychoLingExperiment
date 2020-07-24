from django import forms
from backend.authentification.models import User
from django.contrib.auth.hashers import check_password


class SignUpForm(forms.Form):
    username = forms.CharField(max_length=32, label='username')
    password = forms.CharField(max_length=32, label='password')
    password_again = forms.CharField(max_length=32, label='password_again')
    email = forms.EmailField(max_length=128, label='email')

    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username')
        password = cleaned_data.get('password')
        password_again = cleaned_data.get('password_again')
        email = cleaned_data.get('email')

        # password check!
        if password != password_again:
            self.add_error('password', '비밀번호가 일치하지 않습니다.')
        # duplicate username
        if User.objects.get(username=username) != None:
            self.add_error('username', '이미 존재하는 아이디 입니다.')
        # duplicate email
        if User.objects.get(email=email) != None:
            self.add_error('email', '이미 존재하는 이메일 입니다.')
