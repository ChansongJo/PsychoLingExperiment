from django_mongoengine.mongo_auth.models import User as BaseUser, MongoUserManager
from django.utils import timezone
from mongoengine.errors import DoesNotExist


class UserManager(MongoUserManager):
    def get(self, *args, **kwargs):
        try:
            return self.get_queryset().get(*args, **kwargs)
        except DoesNotExist:
            # ModelBackend expects this exception
            return None


class User(BaseUser):
    objects = UserManager()

    @classmethod
    def create_user(cls, username, password, email=None, is_staff=False, is_superuser=False):
        """Create (and save) a new user with the given username, password and
                email address.
                """
        now = timezone.now()

        # Normalize the address by lowercasing the domain part of the email
        # address.
        if email is not None:
            try:
                email_name, domain_part = email.strip().split('@', 1)
            except ValueError:
                pass
            else:
                email = '@'.join([email_name, domain_part.lower()])

        user = cls(username=username, email=email, date_joined=now)
        user.set_password(password)
        user.is_staff = is_staff
        user.is_superuser = is_superuser
        user.save()
        return user
